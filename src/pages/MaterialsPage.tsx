import React, { useState } from 'react';
import { Search, Upload, FileText, FileImage, Download, Filter } from 'lucide-react';

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    title: 'Основи цивільного права',
    type: 'pdf',
    subject: 'Цивільне право',
    uploadedBy: 'Олександр П.',
    uploadDate: '2023-09-15',
    downloads: 124,
    fileSize: '2.4 MB'
  },
  {
    id: 2,
    title: 'Конспект лекцій з кримінального процесу',
    type: 'docx',
    subject: 'Кримінальний процес',
    uploadedBy: 'Марія К.',
    uploadDate: '2023-10-02',
    downloads: 87,
    fileSize: '1.8 MB'
  },
  {
    id: 3,
    title: 'Схеми з адміністративного права',
    type: 'pdf',
    subject: 'Адміністративне право',
    uploadedBy: 'Іван С.',
    uploadDate: '2023-08-28',
    downloads: 156,
    fileSize: '3.2 MB'
  },
  {
    id: 4,
    title: 'Фотографії конспекту з теорії держави і права',
    type: 'image',
    subject: 'Теорія держави і права',
    uploadedBy: 'Анна В.',
    uploadDate: '2023-09-20',
    downloads: 62,
    fileSize: '15.7 MB'
  },
  {
    id: 5,
    title: 'Методичка з міжнародного права',
    type: 'pdf',
    subject: 'Міжнародне право',
    uploadedBy: 'Петро Д.',
    uploadDate: '2023-10-10',
    downloads: 45,
    fileSize: '4.1 MB'
  }
];

const MaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Filter materials based on search term and filters
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || material.subject === selectedSubject;
    const matchesType = selectedType === '' || material.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  // Get unique subjects for filter
  const subjects = [...new Set(mockMaterials.map(material => material.subject))];
  
  // Get unique file types for filter
  const fileTypes = [...new Set(mockMaterials.map(material => material.type))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Навчальні матеріали</h1>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Завантажити матеріал</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Пошук матеріалів..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Всі предмети</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Всі типи файлів</option>
                {fileTypes.map((type, index) => (
                  <option key={index} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Materials list */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Назва
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Предмет
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Завантажив
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Розмір
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {material.type === 'pdf' && <FileText className="h-5 w-5 text-red-500 mr-2" />}
                      {material.type === 'docx' && <FileText className="h-5 w-5 text-blue-500 mr-2" />}
                      {material.type === 'image' && <FileImage className="h-5 w-5 text-green-500 mr-2" />}
                      <div className="text-sm font-medium text-gray-900">{material.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{material.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{material.uploadedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{material.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{material.fileSize}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 ml-auto">
                      <Download className="h-4 w-4" />
                      <span>Завантажити</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMaterials.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Матеріалів не знайдено. Спробуйте змінити параметри пошуку.</p>
          </div>
        )}
      </div>

      {/* Upload section */}
      <div className="mt-12 bg-blue-50 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Поділіться своїми матеріалами</h2>
        <p className="text-gray-600 mb-6">
          Допоможіть іншим студентам, завантаживши корисні навчальні матеріали. Ви можете завантажувати файли у форматі PDF, Word або зображення високої якості.
        </p>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-2">Перетягніть файли сюди або натисніть, щоб вибрати</p>
          <p className="text-gray-500 text-sm mb-4">Підтримувані формати: PDF, DOCX, JPG, PNG</p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors inline-flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Вибрати файли</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;