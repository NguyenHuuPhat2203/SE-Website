import React, { useState } from 'react';
import { FileText, Video, Download, Eye, Search, Filter, BookOpen, Upload, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import type { Language } from '../../App';

interface ResourceLibraryScreenProps {
  language: Language;
  onNavigate?: (screen: string, resourceId?: number) => void;
}

export function ResourceLibraryScreen({ language, onNavigate }: ResourceLibraryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    title: language === 'en' ? 'Resource Library' : 'Thư viện tài liệu',
    description: language === 'en' ? 'Access lecture notes, videos, and study materials' : 'Truy cập ghi chú bài giảng, video và tài liệu học tập',
    search: language === 'en' ? 'Search resources...' : 'Tìm kiếm tài liệu...',
    allResources: language === 'en' ? 'All resources' : 'Tất cả tài liệu',
    documents: language === 'en' ? 'Documents' : 'Tài liệu',
    videos: language === 'en' ? 'Videos' : 'Video',
    myUploads: language === 'en' ? 'My uploads' : 'Tải lên của tôi',
    upload: language === 'en' ? 'Upload' : 'Tải lên',
    filterBy: language === 'en' ? 'Filter by' : 'Lọc theo',
    download: language === 'en' ? 'Download' : 'Tải xuống',
    view: language === 'en' ? 'View' : 'Xem',
    downloads: language === 'en' ? 'downloads' : 'lượt tải',
    views: language === 'en' ? 'views' : 'lượt xem',
    uploadedBy: language === 'en' ? 'Uploaded by' : 'Tải lên bởi',
    rating: language === 'en' ? 'Rating' : 'Đánh giá',
    downloaded: language === 'en' ? 'Downloaded' : 'Đã tải xuống',
  };

  const handleDownload = (resourceId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(t.downloaded);
  };

  const handleView = (resourceId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate('resource-detail', resourceId);
    }
  };

  const resources = [
    {
      id: 1,
      title: 'Data Structures - Lecture Notes (Week 1-5)',
      type: 'document',
      subject: 'Computer Science',
      uploadedBy: 'Tran Ngoc Bao Duy',
      uploadDate: '2 days ago',
      downloads: 234,
      views: 567,
      rating: 4.8,
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Introduction to Algorithms - Video Lecture',
      type: 'video',
      subject: 'Computer Science',
      uploadedBy: 'Tran Ngoc Bao Duy',
      uploadDate: '1 week ago',
      downloads: 0,
      views: 892,
      rating: 4.9,
      duration: '45:30'
    },
    {
      id: 3,
      title: 'Linear Algebra Problem Set Solutions',
      type: 'document',
      subject: 'Mathematics',
      uploadedBy: 'Dang Van Vinh',
      uploadDate: '3 days ago',
      downloads: 456,
      views: 789,
      rating: 4.7,
      size: '1.8 MB'
    },
    {
      id: 4,
      title: 'Database Design Tutorial Series',
      type: 'video',
      subject: 'Computer Science',
      uploadedBy: 'Mai Duc Trung',
      uploadDate: '5 days ago',
      downloads: 0,
      views: 1234,
      rating: 4.9,
      duration: '1:20:15'
    },
    {
      id: 5,
      title: 'Physics Lab Manual - Mechanics',
      type: 'document',
      subject: 'Physics',
      uploadedBy: 'Nguyen Minh Chau',
      uploadDate: '1 day ago',
      downloads: 123,
      views: 345,
      rating: 4.6,
      size: '5.2 MB'
    },
    {
      id: 6,
      title: 'Calculus Practice Problems',
      type: 'document',
      subject: 'Mathematics',
      uploadedBy: 'Nguyen Thi Xuan Anh',
      uploadDate: '4 days ago',
      downloads: 678,
      views: 1023,
      rating: 4.8,
      size: '3.1 MB'
    }
  ];

  const subjects = ['All Subjects', 'Computer Science', 'Mathematics', 'Physics', 'English'];

  const renderResourceCard = (resource: typeof resources[0]) => {
    const isVideo = resource.type === 'video';
    const Icon = isVideo ? Video : FileText;
    
    return (
      <Card key={resource.id} className="hover:shadow-lg transition-all hover:border-purple-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-5 w-5 ${isVideo ? 'text-pink-600' : 'text-purple-600'}`} />
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {resource.subject}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {resource.rating}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <p>{t.uploadedBy}: {resource.uploadedBy}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                {resource.uploadDate}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {!isVideo && (
                <span className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {resource.downloads} {t.downloads}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {resource.views} {t.views}
              </span>
              {isVideo ? (
                <span>{resource.duration}</span>
              ) : (
                <span>{resource.size}</span>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                size="sm"
                onClick={(e) => handleView(resource.id, e)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {t.view}
              </Button>
              {!isVideo && (
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
                  size="sm"
                  onClick={(e) => handleDownload(resource.id, e)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t.download}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.description}</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Upload className="mr-2 h-4 w-4" />
            {t.upload}
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '-')}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-purple-700">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-purple-900">247</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-pink-700">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-pink-900">89</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-indigo-700">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-indigo-900">158</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="all">
            <BookOpen className="h-4 w-4 mr-2" />
            {t.allResources}
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            {t.documents}
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            {t.videos}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map(renderResourceCard)}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.filter(r => r.type === 'document').map(renderResourceCard)}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.filter(r => r.type === 'video').map(renderResourceCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
