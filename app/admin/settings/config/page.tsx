"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsConfigPage() {
  const [organizationName, setOrganizationName] = useState("计算机科学与技术学院党支部")
  const [organizationCode, setOrganizationCode] = useState("CS12345")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [appNotifications, setAppNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [dataRetention, setDataRetention] = useState("1year")
  const { toast } = useToast()

  const handleSaveBasicSettings = () => {
    toast({
      title: "设置已保存",
      description: "基本设置已成功更新",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "设置已保存",
      description: "通知设置已成功更新",
    })
  }

  const handleSaveDataSettings = () => {
    toast({
      title: "设置已保存",
      description: "数据设置已成功更新",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <p className="text-muted-foreground">管理系统配置和偏好设置</p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">基本设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="data">数据设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card className=" ">
            <CardHeader>
              <CardTitle>基本设置</CardTitle>
              <CardDescription>管理组织基本信息和系统设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">组织信息</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="organization-name">组织名称</Label>
                    <Input
                      id="organization-name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization-code">组织代码</Label>
                    <Input
                      id="organization-code"
                      value={organizationCode}
                      onChange={(e) => setOrganizationCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization-address">组织地址</Label>
                  <Input id="organization-address" defaultValue="北京市海淀区学院路38号" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization-description">组织简介</Label>
                  <Textarea
                    id="organization-description"
                    defaultValue="计算机科学与技术学院党支部成立于1978年，现有党员156人，下设5个党小组。"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">系统设置</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="system-language">系统语言</Label>
                    <Select defaultValue="zh-CN">
                      <SelectTrigger>
                        <SelectValue placeholder="选择系统语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-timezone">系统时区</Label>
                    <Select defaultValue="Asia/Shanghai">
                      <SelectTrigger>
                        <SelectValue placeholder="选择系统时区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">中国标准时间 (GMT+8)</SelectItem>
                        <SelectItem value="America/New_York">美国东部时间 (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">格林威治标准时间 (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-date-format">日期格式</Label>
                  <Select defaultValue="yyyy-MM-dd">
                    <SelectTrigger>
                      <SelectValue placeholder="选择日期格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-mode">调试模式</Label>
                    <p className="text-sm text-muted-foreground">启用系统调试模式，记录详细日志</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveBasicSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className=" ">
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理系统通知和提醒设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">邮件通知</Label>
                      <p className="text-sm text-muted-foreground">通过邮件接收系统通知</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">短信通知</Label>
                      <p className="text-sm text-muted-foreground">通过短信接收系统通知</p>
                    </div>
                    <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications">应用内通知</Label>
                      <p className="text-sm text-muted-foreground">在应用内接收系统通知</p>
                    </div>
                    <Switch id="app-notifications" checked={appNotifications} onCheckedChange={setAppNotifications} />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">通知类型</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="meeting-notifications">会议通知</Label>
                      <p className="text-sm text-muted-foreground">接收会议安排和变更通知</p>
                    </div>
                    <Switch id="meeting-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-notifications">活动通知</Label>
                      <p className="text-sm text-muted-foreground">接收活动安排和变更通知</p>
                    </div>
                    <Switch id="activity-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="development-notifications">党员发展通知</Label>
                      <p className="text-sm text-muted-foreground">接收党员发展相关通知</p>
                    </div>
                    <Switch id="development-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-notifications">系统通知</Label>
                      <p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
                    </div>
                    <Switch id="system-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">通知频率</h3>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">通知发送频率</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue placeholder="选择通知频率" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">实时发送</SelectItem>
                      <SelectItem value="daily">每日汇总</SelectItem>
                      <SelectItem value="weekly">每周汇总</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card className=" ">
            <CardHeader>
              <CardTitle>数据设置</CardTitle>
              <CardDescription>管理系统数据备份和存储设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">数据备份</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">自动备份</Label>
                    <p className="text-sm text-muted-foreground">定期自动备份系统数据</p>
                  </div>
                  <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">备份频率</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency} disabled={!autoBackup}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择备份频率" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">每日备份</SelectItem>
                      <SelectItem value="weekly">每周备份</SelectItem>
                      <SelectItem value="monthly">每月备份</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-storage">备份存储位置</Label>
                  <Select defaultValue="cloud" disabled={!autoBackup}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择备份存储位置" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地存储</SelectItem>
                      <SelectItem value="cloud">云存储</SelectItem>
                      <SelectItem value="both">本地和云存储</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <Button variant="outline" disabled={!autoBackup}>
                    立即备份
                  </Button>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">数据保留</h3>
                <div className="space-y-2">
                  <Label htmlFor="data-retention">数据保留期限</Label>
                  <Select value={dataRetention} onValueChange={setDataRetention}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据保留期限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6个月</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="3years">3年</SelectItem>
                      <SelectItem value="5years">5年</SelectItem>
                      <SelectItem value="forever">永久保留</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-retention">日志保留期限</Label>
                  <Select defaultValue="3months">
                    <SelectTrigger>
                      <SelectValue placeholder="选择日志保留期限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1个月</SelectItem>
                      <SelectItem value="3months">3个月</SelectItem>
                      <SelectItem value="6months">6个月</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">数据导入导出</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline">导入数据</Button>
                  <Button variant="outline">导出数据</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDataSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className=" ">
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>管理系统安全和访问控制设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">密码策略</h3>
                <div className="space-y-2">
                  <Label htmlFor="password-expiration">密码过期时间</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger>
                      <SelectValue placeholder="选择密码过期时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30天</SelectItem>
                      <SelectItem value="60days">60天</SelectItem>
                      <SelectItem value="90days">90天</SelectItem>
                      <SelectItem value="180days">180天</SelectItem>
                      <SelectItem value="never">永不过期</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-complexity">密码复杂度要求</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="选择密码复杂度要求" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低（至少6个字符）</SelectItem>
                      <SelectItem value="medium">中（至少8个字符，包含字母和数字）</SelectItem>
                      <SelectItem value="high">高（至少10个字符，包含大小写字母、数字和特殊字符）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-history">密码历史记录</Label>
                    <p className="text-sm text-muted-foreground">禁止使用最近使用过的密码</p>
                  </div>
                  <Switch id="password-history" defaultChecked />
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">登录安全</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">双因素认证</Label>
                    <p className="text-sm text-muted-foreground">要求用户使用双因素认证登录</p>
                  </div>
                  <Switch id="two-factor-auth" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="account-lockout">账户锁定</Label>
                    <p className="text-sm text-muted-foreground">多次登录失败后锁定账户</p>
                  </div>
                  <Switch id="account-lockout" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">会话超时时间</Label>
                  <Select defaultValue="30min">
                    <SelectTrigger>
                      <SelectValue placeholder="选择会话超时时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15分钟</SelectItem>
                      <SelectItem value="30min">30分钟</SelectItem>
                      <SelectItem value="60min">60分钟</SelectItem>
                      <SelectItem value="120min">120分钟</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">访问控制</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">IP地址限制</Label>
                    <p className="text-sm text-muted-foreground">限制特定IP地址访问系统</p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="concurrent-sessions">并发会话限制</Label>
                    <p className="text-sm text-muted-foreground">限制用户同时登录的会话数</p>
                  </div>
                  <Switch id="concurrent-sessions" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({ title: "设置已保存", description: "安全设置已成功更新" })}>
                保存设置
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
