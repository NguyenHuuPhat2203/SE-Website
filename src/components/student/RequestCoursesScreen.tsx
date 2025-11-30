import React, { useState } from 'react';
import { Search, BookOpen, Users, GraduationCap, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner';
import type { Language } from '../../App';

interface RequestCoursesScreenProps {
  language: Language;
  onNavigate?: (screen: string, courseId?: number) => void;
}

export function RequestCoursesScreen({ language, onNavigate }: RequestCoursesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedCourses, setRequestedCourses] = useState<number[]>([3]); // Course 3 is already requested

  const t = {
    title: language === 'en' ? 'Request Courses' : 'Yêu cầu môn học',
    description: language === 'en' ? 'Browse and request courses for the upcoming semester' : 'Duyệt và yêu cầu các môn học cho học kỳ tới',
    search: language === 'en' ? 'Search courses...' : 'Tìm kiếm môn học...',
    request: language === 'en' ? 'Request' : 'Yêu cầu',
    requested: language === 'en' ? 'Requested' : 'Đã yêu cầu',
    tutors: language === 'en' ? 'tutors' : 'cố vấn',
    students: language === 'en' ? 'students interested' : 'sinh viên quan tâm',
    credits: language === 'en' ? 'credits' : 'tín chỉ',
    viewDetails: language === 'en' ? 'View details' : 'Xem chi tiết',
  };

  const courses = [
    {
      id: 1,
      code: 'CS301',
      name: language === 'en' ? 'Machine Learning' : 'Học máy',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'Introduction to machine learning algorithms and applications' : 'Giới thiệu về thuật toán học máy và ứng dụng',
      credits: 4,
      tutors: 3,
      interested: 45,
      difficulty: 'Advanced',
      color: 'purple',
    },
    {
      id: 2,
      code: 'CS201',
      name: language === 'en' ? 'Advanced Database Systems' : 'Hệ quản trị CSDL nâng cao',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'Deep dive into database design, optimization, and NoSQL' : 'Tìm hiểu sâu về thiết kế CSDL, tối ưu hóa và NoSQL',
      credits: 3,
      tutors: 2,
      interested: 32,
      difficulty: 'Intermediate',
      color: 'blue',
    },
    {
      id: 3,
      code: 'CS302',
      name: language === 'en' ? 'Computer Vision' : 'Thị giác máy tính',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'Image processing and computer vision techniques' : 'Kỹ thuật xử lý ảnh và thị giác máy tính',
      credits: 4,
      tutors: 2,
      interested: 28,
      difficulty: 'Advanced',
      color: 'green',
    },
    {
      id: 4,
      code: 'CS202',
      name: language === 'en' ? 'Distributed Systems' : 'Hệ thống phân tán',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'Design and implementation of distributed systems' : 'Thiết kế và triển khai hệ thống phân tán',
      credits: 3,
      tutors: 3,
      interested: 38,
      difficulty: 'Advanced',
      color: 'indigo',
    },
    {
      id: 5,
      code: 'CS203',
      name: language === 'en' ? 'Mobile Application Development' : 'Phát triển ứng dụng di động',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'Build native and cross-platform mobile applications' : 'Xây dựng ứng dụng di động native và đa nền tảng',
      credits: 3,
      tutors: 4,
      interested: 52,
      difficulty: 'Intermediate',
      color: 'pink',
    },
    {
      id: 6,
      code: 'CS303',
      name: language === 'en' ? 'Natural Language Processing' : 'Xử lý ngôn ngữ tự nhiên',
      department: language === 'en' ? 'Computer Science' : 'Khoa học máy tính',
      description: language === 'en' ? 'NLP techniques and applications using deep learning' : 'Kỹ thuật NLP và ứng dụng sử dụng học sâu',
      credits: 4,
      tutors: 2,
      interested: 30,
      difficulty: 'Advanced',
      color: 'orange',
    },
  ];

  const filteredCourses = courses.filter(c =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleRequestCourse = (courseId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (requestedCourses.includes(courseId)) {
      // Already requested, navigate to detail
      if (onNavigate) {
        onNavigate('course-detail', courseId);
      }
    } else {
      // Request the course
      setRequestedCourses([...requestedCourses, courseId]);
      toast.success(language === 'en' ? 'Course requested successfully' : 'Đã yêu cầu môn học thành công');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isRequested = requestedCourses.includes(course.id);
          return (
          <Card 
            key={course.id} 
            className={`hover:shadow-lg transition-all cursor-pointer ${
              isRequested ? 'ring-2 ring-purple-200' : ''
            }`}
            onClick={() => {
              if (onNavigate) {
                onNavigate('course-detail', course.id);
              }
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-${course.color}-400 to-${course.color}-500`}>
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.code}
                  </Badge>
                </div>
                <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {course.credits} {t.credits}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.tutors} {t.tutors}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {course.interested} {t.students}
                </div>
                <Button 
                  className={`w-full ${
                    isRequested 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  }`}
                  onClick={(e) => handleRequestCourse(course.id, e)}
                >
                  {isRequested ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t.requested}
                    </>
                  ) : (
                    t.request
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
