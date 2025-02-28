import React, { useState, useEffect } from 'react';
import { Search, Upload, FileText, FileImage, Download, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Клієнт Supabase

interface Material {
  id: string;
  title: string;
  type: string;
  subject: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  fileSize: string;
  url: string;
}

const MaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [subjectInput, setSubjectInput] = useState('');

  // Завантаження списку файлів із Supabase
  useEffect(() => {
    async function fetchMaterials() {
      const { data, error } = await supabase.storage.from('materials').list('', { limit: 100 });
      if (error) {
        console.error('Error fetching materials:', error);
        return;
      }

      const fetchedMaterials = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = supabase.storage.from('materials').getPublicUrl(file.name);
          const type = file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : file.name.endsWith('.jpg') || file.name.endsWith('.png') ? 'image' : 'unknown';
          return {
            id: file.id || file.name,
            title: file.name,
            type,
            subject: file.metadata?.subject || 'Без предмету',
            uploadedBy: file.metadata?.uploadedBy || 'Анонім',
            uploadDate: new Date(file.created_at).toLocaleDateString('uk-UA'),
            downloads: file.metadata?.downloads || 0,
            fileSize: `${(file.metadata?.size / 1024 / 1024).toFixed(1)} MB`,
            url: urlData.publicUrl,
          };
        })
      );
      setMaterials(fetchedMaterials);
    }
    fetchMaterials();
  }, []);

  // Фільтрація матеріалів
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || material.subject === selectedSubject;
    const matchesType = selectedType === '' || material.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = [...new Set(materials.map((material) => material.subject))];
  const fileTypes = [...new Set(materials.map((material) => material.type))];

  // Завантаження файлу
  const handleFileUpload = async () => {
    if (!file || !subjectInput) {
      alert('Виберіть файл і вкажіть предмет!');
      return;
    }

    const { error } = await supabase.storage.from('materials').upload(file.name, file, {
      upsert: true,
      contentType: file.type,
      metadata: { subject: subjectInput, uploadedBy: 'Користувач', downloads: 0 },
    });

    if (error) {
      console.error('Upload error:', error);
      alert(`Помилка завантаження: ${error.message}`);
    } else {
      const { data } = supabase.storage.from('materials').getPublicUrl(file.name);
      const type = file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : file.name.endsWith('.jpg') || file.name.endsWith('.png') ? 'image' : 'unknown';
      setMaterials([
        ...materials,
        {
          id: file.name,
          title: file.name,
          type,
          subject: subjectInput,
          uploadedBy: 'Користувач',
          uploadDate: new Date().toLocaleDateString('uk-UA'),
          downloads: 0,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          url: data.publicUrl,
        },
      ]);
      setFile(null);
      setSubjectInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Навчальні матеріали</h1>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center space-x-2"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className="h-5 w-5" />
          <span>Завантажити матеріал</span>
        </button>
      </div>

      {/* Пошук і фільтри */}
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
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
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
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Список матеріалів */}
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
                      <a
                        href={material.url}
                        target="_blank"
                        className="text-sm font-medium text-gray-900 hover:underline"
                      >
                        {material.title}
                      </a>
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
                    <a
                      href={material.url}
                      download={material.title}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 ml-auto"
                    >
                      <Download className="h-4 w-4" />
                      <span>Завантажити</span>
                    </a>
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

      {/* Секція завантаження */}
      <div className="mt-12 bg-blue-50 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Поділіться своїми матеріалами</h2>
        <p className="text-gray-600 mb-6">
          Допоможіть іншим студентам, завантаживши корисні навчальні матеріали. Ви можете завантажувати файли у форматі PDF, Word або зображення високої якості.
        </p>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.docx,.jpg,.png"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <input
            type="text"
            placeholder="Вкажіть предмет"
            className="block w-full max-w-xs mx-auto mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <p className="text-gray-700 mb-2">Перетягніть файли сюди або натисніть, щоб вибрати</p>
          <p className="text-gray-500 text-sm mb-4">Підтримувані формати: PDF, DOCX, JPG, PNG</p>
          <button
            onClick={handleFileUpload}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors inline-flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Завантажити</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;