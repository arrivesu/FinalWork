"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpenIcon, CalendarIcon, ClockIcon, GraduationCapIcon, PlayIcon, SearchIcon, UserIcon } from "lucide-react"

export default function EducationCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // 模拟课程数据
  const availableCourses = [
    {
      id: "course-001",
      title: "习近平新时代中国特色社会主义思想概论",
      instructor: "李教授",
      duration: "12课时",
      level: "基础",
      category: "理论学习",
      enrollmentCount: 156,
      rating: 4.8,
      description: "本课程系统讲解习近平新时代中国特色社会主义思想的核心内容和精神实质。",
    },
    {
      id: "course-002",
      title: "党的二十大精神解读",
      instructor: "王教授",
      duration: "8课时",
      level: "进阶",
      category: "理论学习",
      enrollmentCount: 203,
      rating: 4.9,
      description: "深入解读党的二十大报告，全面把握党的二十大精神。",
    },
    {
      id: "course-003",
      title: "中国共产党党史专题",
      instructor: "张教授",
      duration: "15课时",
      level: "进阶",
      category: "党史学习",
      enrollmentCount: 178,
      rating: 4.7,
      description: "系统学习中国共产党百年奋斗的光辉历程和宝贵经验。",
    },
    {
      id: "course-004",
      title: "党章学习与解读",
      instructor: "刘教授",
      duration: "10课时",
      level: "基础",
      category: "党章学习",
      enrollmentCount: 145,
      rating: 4.6,
      description: "深入学习党章，理解党的性质、宗旨、指导思想、组织原则和纪律。",
    },
  ]

  const enrolledCourses = [
    {
      id: "enrolled-001",
      title: "习近平新时代中国特色社会主义思想概论",
      progress: 75,
      lastStudyDate: "2025-04-10",
      completedLessons: 9,
      totalLessons: 12,
      instructor: "李教授",
      category: "理论学习",
    },
    {
      id: "enrolled-002",
      title: "党章学习与解读",
      progress: 40,
      lastStudyDate: "2025-04-05",
      completedLessons: 4,
      totalLessons: 10,
      instructor: "刘教授",
      category: "党章学习",
    },
  ]

  const completedCourses = [
    {
      id: "completed-001",
      title: "党的二十大精神解读",
      completionDate: "2025-03-20",
      score: 92,
      certificate: "CERT20250320001",
      instructor: "王教授",
      category: "理论学习",
    },
    {
      id: "completed-002",
      title: "党员先锋模范作用专题",
      completionDate: "2025-02-15",
      score: 88,
      certificate: "CERT20250215003",
      instructor: "赵教授",
      category: "党性教育",
    },
  ]

  // 过滤课程
  const filterCourses = (courses) => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const filteredAvailableCourses = filterCourses(availableCourses)
  const filteredEnrolledCourses = filterCourses(enrolledCourses)
  const filteredCompletedCourses = filterCourses(completedCourses)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">党员教育课程</h1>
        <p className="text-muted-foreground">浏览、学习和管理您的党员教育课程</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索课程名称、分类或讲师..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="enrolled">进行中</TabsTrigger>
          <TabsTrigger value="available">可选课程</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4 mt-6">
          {filteredEnrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchTerm ? "未找到符合条件的课程" : "您当前没有正在学习的课程"}
              </CardContent>
            </Card>
          ) : (
            filteredEnrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge>{course.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <UserIcon className="h-3 w-3" />
                    <span>讲师：{course.instructor}</span>
                    <span>•</span>
                    <CalendarIcon className="h-3 w-3" />
                    <span>最近学习：{course.lastStudyDate}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>学习进度：{course.progress}%</span>
                      <span>
                        {course.completedLessons}/{course.totalLessons}课时
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    课程详情
                  </Button>
                  <Button size="sm">
                    <PlayIcon className="mr-2 h-4 w-4" />
                    继续学习
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4 mt-6">
          {filteredAvailableCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">未找到符合条件的课程</CardContent>
            </Card>
          ) : (
            filteredAvailableCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge>{course.category}</Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <UserIcon className="h-3 w-3" />
                    <span>讲师：{course.instructor}</span>
                    <span>•</span>
                    <ClockIcon className="h-3 w-3" />
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.enrollmentCount}人已学习</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">评分：{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button size="sm">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    加入学习
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {filteredCompletedCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchTerm ? "未找到符合条件的课程" : "您当前没有已完成的课程"}
              </CardContent>
            </Card>
          ) : (
            filteredCompletedCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge>{course.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <UserIcon className="h-3 w-3" />
                    <span>讲师：{course.instructor}</span>
                    <span>•</span>
                    <CalendarIcon className="h-3 w-3" />
                    <span>完成日期：{course.completionDate}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">学习成绩</p>
                      <p className="font-medium">{course.score}分</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">证书编号</p>
                      <p className="font-medium">{course.certificate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    复习课程
                  </Button>
                  <Button variant="outline" size="sm">
                    <GraduationCapIcon className="mr-2 h-4 w-4" />
                    查看证书
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
