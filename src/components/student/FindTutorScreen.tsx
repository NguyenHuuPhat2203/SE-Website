import { useState, useMemo } from 'react';
import { Search, Star, Clock, Sparkles, User, Calendar} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Alert, AlertDescription } from '../ui/alert';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Checkbox } from '../ui/checkbox';
import type { Language } from '../../App';

interface FindTutorScreenProps {
  language: Language;
  onNavigate?: (screen: string, tutorId?: number) => void;
}

const mockTutors = [
  {
    id: 1,
    name: 'Dr. Le Thanh Sach',
    department: 'Computer Science',
    specialization: ['Data Structures', 'Algorithms', 'Programming'],
    rating: 4.8,
    reviews: 24,
    avatar: '',
    nextAvailable: 'Tomorrow, 2:00 PM',
    matchScore: 95
  },
  {
    id: 2,
    name: 'Dr. Mai Duc Trung',
    department: 'Computer Science',
    specialization: ['Database', 'Web Development', 'Software Engineering'],
    rating: 4.6,
    reviews: 18,
    avatar: '',
    nextAvailable: 'Today, 4:00 PM',
    matchScore: 87
  },
  {
    id: 3,
    name: 'Dr. Le Hong Trang',
    department: 'Computer Science',
    specialization: ['Machine Learning', 'AI', 'Data Science'],
    rating: 4.9,
    reviews: 32,
    avatar: '',
    nextAvailable: 'Next week, Mon 10:00 AM',
    matchScore: 92
  }
];

export function FindTutorScreen({ language, onNavigate }: FindTutorScreenProps) {
  const [bknetId, setBknetId] = useState('');
  const [course, setCourse] = useState('');
  const [results, setResults] = useState(mockTutors);
  const [selectedTutor, setSelectedTutor] = useState<typeof mockTutors[0] | null>(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);

  const t = {
    title: language === 'en' ? 'Find Tutor' : 'Tìm cố vấn',
    manualSearch: language === 'en' ? 'Manual search' : 'Tìm kiếm thủ công',
    autoSuggestion: language === 'en' ? 'Automatic suggestion (AI)' : 'Gợi ý tự động (AI)',
    bknetId: 'BKnetID',
    optional: language === 'en' ? 'Optional' : 'Tùy chọn',
    course: language === 'en' ? 'Course / Subject' : 'Môn học',
    selectCourse: language === 'en' ? 'Select a course' : 'Chọn môn học',
    search: language === 'en' ? 'Search' : 'Tìm kiếm',
    searchPlaceholder: language === 'en' ? 'Search by name, department, or specialization...' : 'Tìm kiếm theo tên, khoa hoặc chuyên môn...',
    results: language === 'en' ? 'Search results' : 'Kết quả tìm kiếm',
    viewDetails: language === 'en' ? 'View details' : 'Xem chi tiết',
    aiInfo: language === 'en'
      ? 'AI suggests tutors based on your courses, grades and schedule'
      : 'AI gợi ý cố vấn dựa trên môn học, điểm số và lịch trình của bạn',
    getSuggestions: language === 'en' ? 'Get AI suggestions' : 'Nhận gợi ý AI',
    matchScore: language === 'en' ? 'Match score' : 'Điểm phù hợp',
    reviews: language === 'en' ? 'reviews' : 'đánh giá',
    nextAvailable: language === 'en' ? 'Next available' : 'Thời gian rảnh tiếp theo',
    department: language === 'en' ? 'Department' : 'Khoa',
    specialization: language === 'en' ? 'Specialization' : 'Chuyên môn',
    email: 'Email',
    schedule: language === 'en' ? 'Schedule' : 'Lịch trình',
    requestConsultation: language === 'en' ? 'Request consultation' : 'Yêu cầu tư vấn',
    // filter: language === 'en' ? 'Filter' : 'Lọc',
    minRating: language === 'en' ? 'Minimum Rating' : 'Đánh giá tối thiểu',
    clearFilters: language === 'en' ? 'Clear filters' : 'Xóa bộ lọc',
    allDepartments: language === 'en' ? 'All Departments' : 'Tất cả khoa',
    allSpecializations: language === 'en' ? 'All Specializations' : 'Tất cả chuyên môn'
  };

  // Get unique departments and specializations
  const departments = useMemo(() => {
    const depts = new Set(mockTutors.map(t => t.department));
    return Array.from(depts);
  }, []);

  const specializations = useMemo(() => {
    const specs = new Set(mockTutors.flatMap(t => t.specialization));
    return Array.from(specs);
  }, []);

  // Filter tutors based on search and filters
  const filteredTutors = useMemo(() => {
    let filtered = [...mockTutors];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tutor =>
        tutor.name.toLowerCase().includes(query) ||
        tutor.department.toLowerCase().includes(query) ||
        tutor.specialization.some(spec => spec.toLowerCase().includes(query))
      );
    }

    // Department filter
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(tutor => selectedDepartments.includes(tutor.department));
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(tutor => tutor.rating >= minRating);
    }

    // Specialization filter
    if (selectedSpecializations.length > 0) {
      filtered = filtered.filter(tutor =>
        tutor.specialization.some(spec => selectedSpecializations.includes(spec))
      );
    }

    // Manual search with BKnetID and course
    if (bknetId.trim() || course) {
      if (bknetId.trim()) {
        filtered = filtered.filter(tutor =>
          tutor.name.toLowerCase().includes(bknetId.toLowerCase())
        );
      }
      if (course) {
        filtered = filtered.filter(tutor =>
          tutor.specialization.some(spec =>
            spec.toLowerCase().includes(course.toLowerCase())
          )
        );
      }
    }

    return filtered;
  }, [searchQuery, selectedDepartments, minRating, selectedSpecializations, bknetId, course]);

  const handleSearch = () => {
    setResults(filteredTutors);
  };

  const handleAISuggestion = () => {
    setShowAISuggestions(true);
    setResults([...mockTutors].sort((a, b) => b.matchScore - a.matchScore));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartments([]);
    setMinRating(0);
    setSelectedSpecializations([]);
    setBknetId('');
    setCourse('');
    setResults(mockTutors);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">{t.title}</h1>
      </div>

      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList>
          <TabsTrigger value="manual" onClick={() => setShowAISuggestions(false)}>
            <Search className="h-4 w-4 mr-2" />
            {t.manualSearch}
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="h-4 w-4 mr-2" />
            {t.autoSuggestion}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.manualSearch}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bknetId">
                    {t.bknetId} <span className="text-gray-400">({t.optional})</span>
                  </Label>
                  <Input
                    id="bknetId"
                    value={bknetId}
                    onChange={(e) => setBknetId(e.target.value)}
                    placeholder="tutor.hcmut"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">{t.course}</Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder={t.selectCourse} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data-structures">Data Structures</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                      <SelectItem value="database">Database Systems</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="ml">Machine Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                {t.search}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>{t.aiInfo}</AlertDescription>
          </Alert>

          <Button onClick={handleAISuggestion}>
            <Sparkles className="h-4 w-4 mr-2" />
            {t.getSuggestions}
          </Button>
        </TabsContent>
      </Tabs>

      {/* Search and Filter Bar */}
      <div className="mt-8 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setResults(filteredTutors);
            }}
            className="pl-10"
          />
        </div>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {t.filter}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{t.filter}</h4>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  {t.clearFilters}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>{t.department}</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dept-all"
                      checked={selectedDepartments.length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedDepartments([]);
                      }}
                    />
                    <Label htmlFor="dept-all" className="cursor-pointer text-sm">{t.allDepartments}</Label>
                  </div>
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${dept}`}
                        checked={selectedDepartments.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDepartments([...selectedDepartments, dept]);
                          } else {
                            setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                          }
                        }}
                      />
                      <Label htmlFor={`dept-${dept}`} className="cursor-pointer text-sm">{dept}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.minRating}</Label>
                <Select value={minRating.toString()} onValueChange={(val) => setMinRating(Number(val))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{t.allSpecializations}</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4.8">4.8+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.specialization}</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="spec-all"
                      checked={selectedSpecializations.length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedSpecializations([]);
                      }}
                    />
                    <Label htmlFor="spec-all" className="cursor-pointer text-sm">{t.allSpecializations}</Label>
                  </div>
                  {specializations.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${spec}`}
                        checked={selectedSpecializations.includes(spec)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSpecializations([...selectedSpecializations, spec]);
                          } else {
                            setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
                          }
                        }}
                      />
                      <Label htmlFor={`spec-${spec}`} className="cursor-pointer text-sm">{spec}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
      </div>

      {/* Results */}
      <div className="mt-4">
        <h2 className="text-gray-900 mb-4">{t.results} ({filteredTutors.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTutor(tutor)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.department}</p>
                  </div>
                  {showAISuggestions && (
                    <Badge variant="secondary">
                      {tutor.matchScore}%
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{tutor.rating}</span>
                  <span className="text-sm text-gray-500">({tutor.reviews} {t.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {tutor.specialization.slice(0, 2).map((spec, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {tutor.specialization.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{tutor.specialization.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutor.nextAvailable}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNavigate) {
                      onNavigate('tutor-detail', tutor.id);
                    } else {
                      setSelectedTutor(tutor);
                    }
                  }}
                >
                  {t.viewDetails}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tutor Detail Sheet */}
      <Sheet open={!!selectedTutor} onOpenChange={() => setSelectedTutor(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedTutor && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedTutor.avatar} alt={selectedTutor.name} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedTutor.name}</SheetTitle>
                    <SheetDescription>{selectedTutor.department}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{selectedTutor.rating}</span>
                  <span className="text-gray-500">({selectedTutor.reviews} {t.reviews})</span>
                </div>

                <div>
                  <Label className="text-gray-600">{t.email}</Label>
                  <p className="text-gray-900">{selectedTutor.name.toLowerCase().replace(/\s/g, '.')}@hcmut.edu.vn</p>
                </div>

                <div>
                  <Label className="text-gray-600">{t.department}</Label>
                  <p className="text-gray-900">{selectedTutor.department}</p>
                </div>

                <div>
                  <Label className="text-gray-600">{t.specialization}</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTutor.specialization.map((spec, idx) => (
                      <Badge key={idx} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600">{t.nextAvailable}</Label>
                  <p className="text-gray-900">{selectedTutor.nextAvailable}</p>
                </div>

                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t.requestConsultation}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
