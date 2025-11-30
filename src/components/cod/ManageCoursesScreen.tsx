import { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import type { Language } from '../../App';

const mockCourses = [
  { id: 1, code: 'CS101', name: 'Data Structures', department: 'Computer Science', tutors: 3, students: 45 },
  { id: 2, code: 'CS102', name: 'Algorithms', department: 'Computer Science', tutors: 4, students: 52 },
  { id: 3, code: 'CS201', name: 'Database Systems', department: 'Computer Science', tutors: 2, students: 38 },
  { id: 4, code: 'CS301', name: 'Machine Learning', department: 'Computer Science', tutors: 3, students: 41 }
];

interface ManageCoursesScreenProps {
  language: Language;
  onNavigate?: (screen: string) => void;
}

export function ManageCoursesScreen({ language, onNavigate }: ManageCoursesScreenProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');

  const t = {
    title: language === 'en' ? 'Manage Courses' : 'Quản lý môn học',
    addCourse: language === 'en' ? 'Add course' : 'Thêm môn học',
    viewRequests: language === 'en' ? 'View all requests' : 'Xem tất cả yêu cầu',
    search: language === 'en' ? 'Search courses...' : 'Tìm kiếm môn học...',
    code: language === 'en' ? 'Course code' : 'Mã môn học',
    name: language === 'en' ? 'Course name' : 'Tên môn học',
    department: language === 'en' ? 'Department' : 'Khoa',
    tutors: language === 'en' ? 'Tutors' : 'Cố vấn',
    students: language === 'en' ? 'Students' : 'Sinh viên',
    actions: language === 'en' ? 'Actions' : 'Thao tác',
    cancel: language === 'en' ? 'Cancel' : 'Hủy',
    save: language === 'en' ? 'Save' : 'Lưu',
    success: language === 'en' ? 'Course saved successfully!' : 'Đã lưu môn học!'
  };

  const handleSave = () => {
    toast.success(t.success);
    setOpen(false);
    setCourseCode('');
    setCourseName('');
  };

  const filteredCourses = mockCourses.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-gray-900">{t.title}</h1>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => onNavigate && onNavigate('course-requests')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            {t.viewRequests}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t.addCourse}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.addCourse}</DialogTitle>
              <DialogDescription>Add a new course to the department</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t.code}</Label>
                <Input id="code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>{t.cancel}</Button>
              <Button onClick={handleSave}>{t.save}</Button>
            </DialogFooter>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.code}</TableHead>
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.department}</TableHead>
                <TableHead className="text-right">{t.tutors}</TableHead>
                <TableHead className="text-right">{t.students}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell className="text-right">{course.tutors}</TableCell>
                  <TableCell className="text-right">{course.students}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
