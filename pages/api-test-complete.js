import React, { useState, useEffect } from 'react';
import { useApi } from '../lib/context/ApiContext';

/**
 * 完整API测试页面
 * 用于测试所有前后端API模块的通讯
 */
const ApiTestComplete = () => {
  const api = useApi();
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState('all');

  // 测试认证API
  const testAuthApi = async () => {
    try {
      // 测试登录
      const loginResult = await api.login('admin', 'password');
      
      // 获取当前用户
      let currentUserResult = null;
      if (loginResult.success) {
        currentUserResult = api.currentUser;
      }
      
      // 测试登出
      const logoutResult = await api.logout();
      
      return {
        login: loginResult,
        currentUser: currentUserResult,
        logout: logoutResult
      };
    } catch (error) {
      console.error('Auth API test failed:', error);
      return { error: error.message };
    }
  };

  // 测试党支部API
  const testBranchApi = async () => {
    try {
      // 获取所有党支部
      const branches = await api.apiService.get('/branches');
      
      // 创建新党支部
      const newBranch = await api.apiService.post('/branches', {
        name: '测试党支部',
        superiorOrg: '测试上级组织'
      });
      
      // 获取单个党支部
      const singleBranch = await api.apiService.get(`/branches/${newBranch.id}`);
      
      // 更新党支部
      const updatedBranch = await api.apiService.put(`/branches/${newBranch.id}`, {
        ...newBranch,
        name: '更新后的党支部名称'
      });
      
      // 删除党支部
      const deleteResult = await api.apiService.delete(`/branches/${newBranch.id}`);
      
      return {
        getAll: branches,
        create: newBranch,
        getById: singleBranch,
        update: updatedBranch,
        delete: deleteResult
      };
    } catch (error) {
      console.error('Branch API test failed:', error);
      return { error: error.message };
    }
  };

  // 测试党员API
  const testMemberApi = async () => {
    try {
      // 获取所有党员
      const members = await api.apiService.get('/members');
      
      // 创建新党员
      const newMember = await api.apiService.post('/members', {
        username: `testmember_${Date.now()}`,
        password: 'password',
        name: '测试党员',
        gender: '男',
        identityType: '正式党员'
      });
      
      // 获取单个党员
      const singleMember = await api.apiService.get(`/members/${newMember.id}`);
      
      // 更新党员
      const updatedMember = await api.apiService.put(`/members/${newMember.id}`, {
        ...newMember,
        name: '更新后的党员名称'
      });
      
      // 删除党员
      const deleteResult = await api.apiService.delete(`/members/${newMember.id}`);
      
      return {
        getAll: members,
        create: newMember,
        getById: singleMember,
        update: updatedMember,
        delete: deleteResult
      };
    } catch (error) {
      console.error('Member API test failed:', error);
      return { error: error.message };
    }
  };

  // 测试活动API
  const testActivityApi = async () => {
    try {
      // 获取所有活动
      const activities = await api.apiService.get('/activities');
      
      // 创建新活动
      const newActivity = await api.apiService.post('/activities', {
        title: '测试活动',
        type: '组织生活会',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        location: '测试地点',
        content: '测试活动内容'
      });
      
      // 获取单个活动
      const singleActivity = await api.apiService.get(`/activities/${newActivity.id}`);
      
      // 更新活动
      const updatedActivity = await api.apiService.put(`/activities/${newActivity.id}`, {
        ...newActivity,
        title: '更新后的活动标题'
      });
      
      // 删除活动
      const deleteResult = await api.apiService.delete(`/activities/${newActivity.id}`);
      
      return {
        getAll: activities,
        create: newActivity,
        getById: singleActivity,
        update: updatedActivity,
        delete: deleteResult
      };
    } catch (error) {
      console.error('Activity API test failed:', error);
      return { error: error.message };
    }
  };

  // 测试活动参与API
  const testActivityJoinApi = async () => {
    try {
      // 先创建一个活动和一个党员用于测试
      const activity = await api.apiService.post('/activities', {
        title: '测试活动-参与',
        type: '组织生活会',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        location: '测试地点',
        content: '测试活动内容'
      });
      
      const member = await api.apiService.post('/members', {
        username: `testmember_join_${Date.now()}`,
        password: 'password',
        name: '测试党员-参与',
        gender: '男',
        identityType: '正式党员'
      });
      
      // 获取所有活动参与记录
      const activityJoins = await api.apiService.get('/activity-joins');
      
      // 创建新活动参与记录
      const newActivityJoin = await api.apiService.post('/activity-joins', {
        activity: { id: activity.id },
        member: { id: member.id },
        status: '已报名'
      });
      
      // 获取单个活动参与记录
      const singleActivityJoin = await api.apiService.get(`/activity-joins/${newActivityJoin.id}`);
      
      // 更新活动参与记录
      const updatedActivityJoin = await api.apiService.put(`/activity-joins/${newActivityJoin.id}`, {
        ...newActivityJoin,
        status: '已参加'
      });
      
      // 删除活动参与记录
      const deleteJoinResult = await api.apiService.delete(`/activity-joins/${newActivityJoin.id}`);
      
      // 清理测试数据
      await api.apiService.delete(`/activities/${activity.id}`);
      await api.apiService.delete(`/members/${member.id}`);
      
      return {
        getAll: activityJoins,
        create: newActivityJoin,
        getById: singleActivityJoin,
        update: updatedActivityJoin,
        delete: deleteJoinResult
      };
    } catch (error) {
      console.error('ActivityJoin API test failed:', error);
      return { error: error.message };
    }
  };

  // 测试通知API
  const testNoticeApi = async () => {
    try {
      // 获取所有通知
      const notices = await api.apiService.get('/notices');
      
      // 创建新通知
      const newNotice = await api.apiService.post('/notices', {
        title: '测试通知',
        content: '测试通知内容',
        publishDate: new Date().toISOString(),
        publisher: { id: 1 } // 假设ID为1的用户存在
      });
      
      // 获取单个通知
      const singleNotice = await api.apiService.get(`/notices/${newNotice.id}`);
      
      // 更新通知
      const updatedNotice = await api.apiService.put(`/notices/${newNotice.id}`, {
        ...newNotice,
        title: '更新后的通知标题'
      });
      
      // 删除通知
      const deleteResult = await api.apiService.delete(`/notices/${newNotice.id}`);
      
      return {
        getAll: notices,
        create: newNotice,
        getById: singleNotice,
        update: updatedNotice,
        delete: deleteResult
      };
    } catch (error) {
      console.error('Notice API test failed:', error);
      return { error: error.message };
    }
  };

  // 运行所有测试或单个测试
  const runTests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let results = {};
      
      if (selectedTest === 'all' || selectedTest === 'auth') {
        results.auth = await testAuthApi();
      }
      
      if (selectedTest === 'all' || selectedTest === 'branch') {
        results.branch = await testBranchApi();
      }
      
      if (selectedTest === 'all' || selectedTest === 'member') {
        results.member = await testMemberApi();
      }
      
      if (selectedTest === 'all' || selectedTest === 'activity') {
        results.activity = await testActivityApi();
      }
      
      if (selectedTest === 'all' || selectedTest === 'activityJoin') {
        results.activityJoin = await testActivityJoinApi();
      }
      
      if (selectedTest === 'all' || selectedTest === 'notice') {
        results.notice = await testNoticeApi();
      }
      
      setTestResults(results);
    } catch (error) {
      console.error('API tests failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">前后端API通讯测试</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          选择测试模块:
        </label>
        <select 
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="all">所有模块</option>
          <option value="auth">认证模块</option>
          <option value="branch">党支部模块</option>
          <option value="member">党员模块</option>
          <option value="activity">活动模块</option>
          <option value="activityJoin">活动参与模块</option>
          <option value="notice">通知模块</option>
        </select>
      </div>
      
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={runTests}
        disabled={isLoading}
      >
        {isLoading ? '测试中...' : '运行API测试'}
      </button>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>错误:</strong> {error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">测试结果:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ApiTestComplete;
