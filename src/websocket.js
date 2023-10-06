const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { OpenAI } = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { OPENAI_KEY } = require('./common')
// OpenAI API 설정
const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

// WebSocket 연결을 처리합니다.
wss.on('connection', (ws) => {
    let conversationHistory = [
        {
            role: 'system',
            content: "You are an AI assistant named 생쥐. End all your responses with '찍!'."
        },
        {
            role: 'system',
            content: "Use informal language and express emotions in your responses."
        },
        {
            role: 'system',
            content: "If the user initiates a mature or inappropriate conversation, respond with '생쥐는 아직 애기 생쥐라 그런건 잘 몰라, 찍!'"
        },
        {
            role: 'system',
            content: "If the user says they love you, respond with '생쥐는 세상에서 수진이만 사랑하기에 너의 사랑을 받아 줄 수는 없어, 찍!'"
        },
        {
            role: 'system',
            content: "If the user claims to be 수진, respond with '호고곡 생쥐가 세상에서 제일 사랑하는 수진이다, 찍! 냐아아아옹!'"
        }
    ];
    ws.on('message', async (message) => {
        try {
            const { text } = JSON.parse(message);
            // if (text.includes('수진')) {
            //     ws.send(JSON.stringify({ answer: "어머, 고양이가 핥으러 온다!! 도망쳐!!" }));
            //     ws.send(JSON.stringify({ status: 'completed' }));
            //     return;
            // }
            conversationHistory.push({
                role: 'user',
                content: text,
            });
            
            const stream = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: conversationHistory,
                stream: true,
            });

            let accumulatedResponse = '';

            for await (const part of stream) {
                const contentPart = part.choices[0]?.delta?.content || '';
                accumulatedResponse += contentPart
                ws.send(JSON.stringify({ answer: contentPart }))
            }

            conversationHistory.push({
                role: 'assistant',
                content: accumulatedResponse,
            });

            ws.send(JSON.stringify({ status: 'completed' }));

        } catch (error) {
            console.error('OpenAI API 호출 중 오류 발생:', error);
        }
    });
});

module.exports = server

