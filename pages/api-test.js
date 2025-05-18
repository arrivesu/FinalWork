import React, { useState, useEffect } from 'react';
import { useApi } from '../lib/context/ApiContext';

/**
 * API测试页面
 * 用于测试前后端API通讯
 */
const ApiTest = () => {
  const api = useApi();
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 测试认证API
  const testAuthApi = async () => {
    try {
      setIsLoading(true);
      // 测试登录
      const loginResult = await api.login('admin', 'password');
      
      // 获取当前用户
      let currentUserResult = null;
      if (loginResult.success) {
        currentUserResult = api.currentUser;
      }
      
      return {
        login: loginResult,
        currentUser: currentUserResult
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
        username: 'testmember',
        password: 'password',
        name: '测试党员',
        gender: '男',
        identityType: '正式党员'
      });
      
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
        update: updatedMember,
        delete: deleteResult
      };
    } catch (error) {
      console.error('Member API test failed:', error);
      return { error: error.message };
    }
  };

  // 运行所有测试
  const runAllTests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = {
        auth: await testAuthApi(),
        branch: await testBranchApi(),
        member: await testMemberApi(),
        // 可以添加更多API测试
      };
      
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
      <h1 className="text-2xl font-bold mb-4">API测试页面</h1>
      
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={runAllTests}
        disabled={isLoading}
      >
        {isLoading ? '测试中...' : '运行所有API测试'}
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

export default ApiTest;
