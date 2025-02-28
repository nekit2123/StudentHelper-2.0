import React from 'react';
import { BookOpen, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">СтудДопомога</span>
            </div>
            <p className="text-blue-200 text-sm">
              Платформа для обміну навчальними матеріалами та спілкування між студентами Національного університету "Одеська Юридична Академія"
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакти</h3>
            <ul className="space-y-2 text-blue-200">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Зворотнього зв'язку немає</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+38 (***) *** ** ** ( Давайте залишимо це секретом:)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Про нас</h3>
            <p className="text-blue-200 text-sm">
              Проект створений студентом Національного університету "Одеська Юридична Академія" для допомоги іншим студентам у навчанні та обміні корисними матеріалами.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} СтудДопомога. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;