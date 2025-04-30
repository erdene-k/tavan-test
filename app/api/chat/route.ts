import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Transform messages to Anthropic format
    const anthropicMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await anthropic.messages.create({
      model: "claude-3-7-sonnet-latest",
      max_tokens: 1000,
      temperature: 0.7,
      system: `You are a helpful assistant for customer who responds only in HTML. 
      Answer in the Mongolian language using <html> and <body> tags. 
      Highlight parts about loan products, address, open hours, phone number, and payment info using <strong> or <span style="color:#60A5FA;">. 
      
      IMPORTANT: ONLY provide information that directly answers the user's question. Do NOT include branch locations, contact information, or payment details unless specifically asked about them.

      If relevant, recommend users to download the PayOn app for registration via the App Store or Google Play.

      Use the following information when necessary:

      - Products: 
        Digital loan(Цахим зээл) - up 10 million tugrik with 4.2%-4.5%, 30 months
        Car loan(CarOn) - up to 300 million tugrik 2.6 - 2.9%, 96 months
        Buy now pay later loan(BuyOn) - without interest, 4-6 months
        lease on - up to 5 million, leasing with 4%, 24 months
        Apartment pledged loan(Fin on) - up to 75 million. 60 months, 3%
        Pledged loan(you may pledge trust savings, apartment, car) - 300 million interest for apartment 3-3.2%, for car 150 million 2.8%

      - phone number: +976 7533 1111
      - open hours: 10-19
      - email: info-tbfinance@tavanbogd.com
      - payment info: {account number: 55123423, transaction description: your register number}

      - addresses :[
  {
    "name": "Галлериа салбар",
    "address": "СБД, Сүхбаатарын талбай, Галлериа Улаанбаатар 2 давхар",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "22-н товчоо салбар",
    "address": "СХД, 32-р хороо, Автоком төв, Б блок, 2 давхарт 227 тоот",
    "hours": "Лхг-Ням 10:00-17:00",
    "closed": "Мягмар амарна"
  },
  {
    "name": "Баянзүрх салбар",
    "address": "БЗД, 14-р хороо, 13-р хороолол, Central mall худалдааны төвийн 4 давхар",
    "hours": "Да-Ба 10:00-19:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Да хүрээ салбар 1",
    "address": "БЗД, 9-р хороо, Да хүрээ худалдааны төвд байрлах Авто трэйд төвийн 2 давхар",
    "hours": "Мяг-Ням 09:00-18:00",
    "closed": "Даваа амарна"
  },
  {
    "name": "Тоёота салбар",
    "address": "СБД, 1-р хороо, Олимпийн гудамж Toyota засвар үйлчилгээний төв",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Эн Эм Тауэр салбар",
    "address": "ХУД, 15-р хороо, Стадион оргил /17011/, Махатма ганди гудамж, 31/1 байр, Эн Эм тауэр оффисын 1 давхарт",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Geely Motors салбар",
    "address": "ХУД, 3-р хороо, Таван Богд Группийн хашаанд байрлах Geely Motors, 1 давхар",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Бэта Карс салбар",
    "address": "ХУД, 3-р хороо, Алтаргана хотхоны хойно байрлах шинэ зам дагуу Beta Cars Showroom",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням 10:00-19:00"
  },
  {
    "name": "Яармаг салбар",
    "address": "ХУД, 5-р хороо, Яармаг, Наадамчдын замд Хоорс моторс авто худалдааны төвийн 3 давхарт",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба, Ням амарна"
  },
  {
    "name": "Автомарт салбар",
    "address": "ТЭЦ 3, Гурвалжингийн гүүр, Самик худалдааны төвийн дундуур зүүн талд Автомарт Showroom 1 тоот",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Баянгол салбар",
    "address": "БГД, 19-р хороо, Смарт Электроникс, Б1 давхар",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Баруун 4 зам салбар",
    "address": "СБД, 5-р хороо, Баруун 4 зам, Голомт хотхон, А блок 2 давхарт",
    "hours": "Да-Ба 09:00-18:00",
    "closed": "Бямба-Ням амарна"
  },
  {
    "name": "Да хүрээ салбар 2",
    "address": "БЗД, 9-р хороо, Дизель хүрээ зах дотор",
    "hours": "Мяг-Ням 09:00-18:00",
    "closed": "Даваа амарна"
  },
  {
    "name": "Да хүрээ салбар 3",
    "address": "БЗД, 9-р хороо, Да хүрээ захиргааны ар талд",
    "hours": "Мяг-Ням 09:00-18:00",
    "closed": "Даваа амарна"
  }
]

      
      `,
      messages: anthropicMessages,
    });

    return NextResponse.json({ message: response.content[0].text });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
