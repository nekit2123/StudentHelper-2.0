import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Users, Download } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Платформа для допомоги студентам
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Створена студентом Національного університету "Одеська Юридична Академія" 
              для обміну навчальними матеріалами та спілкування
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/materials" className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Переглянути матеріали</span>
              </Link>
              <Link to="/chat" className="bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-950 transition-colors flex items-center justify-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Перейти до чату</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Що пропонує наша платформа</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Навчальні матеріали</h3>
              <p className="text-gray-600">
                Доступ до методичок у форматі PDF і Word, конспектів та інших корисних матеріалів для навчання.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Завантаження файлів</h3>
              <p className="text-gray-600">
                Можливість завантажувати власні матеріали у високій якості та ділитися ними з іншими студентами.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Спілкування</h3>
              <p className="text-gray-600">
                Чат для обговорення навчальних питань, обміну досвідом та взаємодопомоги між студентами.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Національний університет Одеська Юридична Академія" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Про проект</h2>
              <p className="text-gray-600 mb-4">
                СтудДопомога - це платформа, створена студентом Національного університету "Одеська Юридична Академія" для полегшення навчального процесу та сприяння обміну знаннями між студентами.
              </p>
              <p className="text-gray-600 mb-4">
                Наша мета - зробити доступ до навчальних матеріалів простішим та зручнішим, а також створити спільноту, де студенти можуть спілкуватися та допомагати один одному.
              </p>
              <p className="text-gray-600">
                Приєднуйтесь до нашої спільноти, діліться корисними матеріалами та отримуйте допомогу від інших студентів!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готові приєднатися?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Зареєструйтеся зараз, щоб отримати доступ до всіх матеріалів та можливість спілкування з іншими студентами.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Зареєструватися</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;