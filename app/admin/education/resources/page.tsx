"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Video, Download, Plus, Edit, Trash2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟学习资料数据
const resources = [
  {
    id: "1",
    title: "习近平新时代中国特色社会主义思想学习纲要",
    type: "document",
    category: "理论学习",
    date: "2023-10-15",
    size: "2.5MB",
    downloads: 156,
  },
  {
    id: "2",
    title: "党的二十大报告学习辅导材料",
    type: "document",
    category: "理论学习",
    date: "2023-09-20",
    size: "3.8MB",
    downloads: 245,
  },
  {
    id: "3",
    title: "中国共产党简史",
    type: "document",
    category: "党史学习",
    date: "2023-08-10",
    size: "5.2MB",
    downloads: 189,
  },
  {
    id: "4",
    title: "党章学习辅导",
    type: "document",
    category: "党章学习",
    date: "2023-07-15",
    size: "1.8MB",
    downloads: 210,
  },
  {
    id: "5",
    title: "党的二十大精神解读视频",
    type: "video",
    category: "理论学习",
    date: "2023-11-05",
    size: "120MB",
    downloads: 98,
  },
  {
    id: "6",
    title: "党史学习教育专题片",
    type: "video",
    category: "党史学习",
    date: "2023-06-20",
    size: "150MB",
    downloads: 76,
  },
]

export default function AdminResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const { toast } = useToast()

  // 过滤资料
  const filterResources = (category: string) => {
    return resources
      .filter((resource) => category === "all" || resource.category === category)
      .filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const allResources = filterResources("all")
  const theoryResources = filterResources("理论学习")
  const historyResources = filterResources("党史学习")
  const charterResources = filterResources("党章学习")

  const handleAddResource = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "学习资料已成功添加",
    })
  }

  const handleEditResource = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "编辑成功",
      description: "学习资料已成功更新",
    })
  }

  const handleDeleteResource = (resource: any) => {
    toast({
      title: "删除成功",
      description: `学习资料 "${resource.title}" 已成功删除`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">学习资料</h1>
          <p className="text-muted-foreground">管理党课学习资料</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加资料
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加学习资料</DialogTitle>
              <DialogDescription>添加新的党课学习资料</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">资料标题</Label>
                <Input id="title" placeholder="请输入资料标题" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">资料类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择资料类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">文档</SelectItem>
                      <SelectItem value="video">视频</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">资料分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择资料分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="理论学习">理论学习</SelectItem>
                      <SelectItem value="党史学习">党史学习</SelectItem>
                      <SelectItem value="党章学习">党章学习</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">上传文件</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">点击上传</span> 或拖放文件
                      </p>
                      <p className="text-xs text-muted-foreground">支持 PDF, DOC, PPT, MP4 等格式</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">资料描述</Label>
                <Textarea id="description" placeholder="请输入资料描述" className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddResource}>添加</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索资料标题或类型..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="theory">理论学习</TabsTrigger>
          <TabsTrigger value="history">党史学习</TabsTrigger>
          <TabsTrigger value="charter">党章学习</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>全部资料</CardTitle>
              <CardDescription>所有党课学习资料，共 {allResources.length} 项</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {allResources.length > 0 ? (
                  allResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          {resource.type === "document" ? (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Video className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.category}</Badge>
                            <p className="text-xs text-muted-foreground">
                              上传时间: {resource.date} | 大小: {resource.size} | 下载次数: {resource.downloads}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog
                          open={isEditDialogOpen && selectedResource?.id === resource.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (open) setSelectedResource(resource)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              编辑
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>编辑学习资料</DialogTitle>
                              <DialogDescription>编辑学习资料信息</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-title">资料标题</Label>
                                <Input id="edit-title" defaultValue={resource.title} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-type">资料类型</Label>
                                  <Select defaultValue={resource.type}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="选择资料类型" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="document">文档</SelectItem>
                                      <SelectItem value="video">视频</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-category">资料分类</Label>
                                  <Select defaultValue={resource.category}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="选择资料分类" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="理论学习">理论学习</SelectItem>
                                      <SelectItem value="党史学习">党史学习</SelectItem>
                                      <SelectItem value="党章学习">党章学习</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">资料描述</Label>
                                <Textarea
                                  id="edit-description"
                                  placeholder="请输入资料描述"
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                取消
                              </Button>
                              <Button onClick={handleEditResource}>保存</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theory">
          <Card>
            <CardHeader>
              <CardTitle>理论学习</CardTitle>
              <CardDescription>理论学习相关资料，共 {theoryResources.length} 项</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {theoryResources.length > 0 ? (
                  theoryResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          {resource.type === "document" ? (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Video className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.category}</Badge>
                            <p className="text-xs text-muted-foreground">
                              上传时间: {resource.date} | 大小: {resource.size} | 下载次数: {resource.downloads}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>党史学习</CardTitle>
              <CardDescription>党史学习相关资料，共 {historyResources.length} 项</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {historyResources.length > 0 ? (
                  historyResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          {resource.type === "document" ? (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Video className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.category}</Badge>
                            <p className="text-xs text-muted-foreground">
                              上传时间: {resource.date} | 大小: {resource.size} | 下载次数: {resource.downloads}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="charter">
          <Card>
            <CardHeader>
              <CardTitle>党章学习</CardTitle>
              <CardDescription>党章学习相关资料，共 {charterResources.length} 项</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {charterResources.length > 0 ? (
                  charterResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          {resource.type === "document" ? (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Video className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.category}</Badge>
                            <p className="text-xs text-muted-foreground">
                              上传时间: {resource.date} | 大小: {resource.size} | 下载次数: {resource.downloads}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
