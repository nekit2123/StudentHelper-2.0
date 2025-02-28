import React, { useState } from 'react';
import { Send, User, Users, Search, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for chat
const mockChats = [
  {
    id: 1,
    name: 'Загальний чат',
    isGroup: true,
    lastMessage: 'Хто має конспект з цивільного права?',
    lastMessageTime: new Date(2023, 9, 15, 14, 30),
    unreadCount: 3
  },
  {
    id: 2,
    name: 'Марія Ковальчук',
    isGroup: false,
    lastMessage: 'Дякую за допомогу!',
    lastMessageTime: new Date(2023, 9, 15, 12, 45),
    unreadCount: 0
  },
  {
    id: 3,
    name: 'Група 301',
    isGroup: true,
    lastMessage: 'Завтра лекція о 9:00',
    lastMessageTime: new Date(2023, 9, 14, 18, 20),
    unreadCount: 0
  },
  {
    id: 4,
    name: 'Іван Петренко',
    isGroup: false,
    lastMessage: 'Можеш скинути матеріали з адмін. права?',
    lastMessageTime: new Date(2023, 9, 14, 16, 10),
    unreadCount: 1
  },
  {
    id: 5,
    name: 'Підготовка до іспитів',
    isGroup: true,
    lastMessage: 'Хто знає, які питання будуть на іспиті?',
    lastMessageTime: new Date(2023, 9, 13, 20, 5),
    unreadCount: 0
  }
];

// Mock messages for the selected chat
const mockMessages = [
  {
    id: 1,
    senderId: 'other',
    senderName: 'Іван Петренко',
    text: 'Привіт! Ти не міг би поділитися матеріалами з адміністративного права?',
    timestamp: new Date(2023, 9, 14, 16, 10)
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'Я',
    text: 'Привіт! Звичайно, які саме матеріали тобі потрібні?',
    timestamp: new Date(2023, 9, 14, 16, 15)
  },
  {
    id: 3,
    senderId: 'other',
    senderName: 'Іван Петренко',
    text: 'Мені потрібні конспекти лекцій та методичка для підготовки до іспиту',
    timestamp: new Date(2023, 9, 14, 16, 18)
  },
  {
    id: 4,
    senderId: 'me',
    senderName: 'Я',
    text: 'Добре, я маю ці матеріали. Зараз завантажу їх на платформу і скину тобі посилання',
    timestamp: new Date(2023, 9, 14, 16, 20)
  },
  {
    id: 5,
    senderId: 'me',
    senderName: 'Я',
    text: 'Готово! Перевір розділ "Матеріали", я щойно завантажив конспекти та методичку з адміністративного права',
    timestamp: new Date(2023, 9, 14, 16, 25)
  }
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[3]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    
    // Clear the input
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm');
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Чат</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex h-[calc(100vh-200px)]">
        {/* Chat list */}
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Пошук чатів..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedChat.id === chat.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {chat.isGroup ? (
                      <div className="bg-blue-100 rounded-full p-2">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-full p-2">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                      <p className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {filteredChats.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                Чатів не знайдено
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <PlusCircle className="h-5 w-5" />
              <span>Новий чат</span>
            </button>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="hidden md:flex md:w-2/3 flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center">
                {selectedChat.isGroup ? (
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">
                    {selectedChat.isGroup ? 'Груповий чат' : 'Особисте повідомлення'}
                  </p>
                </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg, index) => {
                  const showDate = index === 0 || 
                    formatDate(mockMessages[index-1].timestamp) !== formatDate(msg.timestamp);
                  
                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="text-center my-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.senderId === 'me' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}>
                          {msg.senderId !== 'me' && (
                            <p className="text-xs font-medium mb-1">{msg.senderName}</p>
                          )}
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 text-right ${
                            msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Введіть повідомлення..."
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Виберіть чат, щоб почати спілкування</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile view - show message that you need to select a chat */}
        <div className="flex md:hidden w-full items-center justify-center">
          <div className="text-center p-8">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Виберіть чат зі списку, щоб почати спілкування</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;