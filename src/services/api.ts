const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
  token?: string;
  user?: any;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    
    return data;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe(): Promise<ApiResponse> {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // Public registration endpoints
  async createSuperAdmin(userData: any): Promise<ApiResponse> {
    return this.request('/setup/superadmin', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async createTenant(tenantData: any): Promise<ApiResponse> {
    return this.request('/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  }

  // User endpoints
  async getUsers(): Promise<ApiResponse> {
    return this.request('/users', {
      method: 'GET',
    });
  }

  async createUser(userData: any): Promise<ApiResponse> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Member endpoints
  async getMembers(): Promise<ApiResponse> {
    return this.request('/members', {
      method: 'GET',
    });
  }

  async createMember(memberData: any): Promise<ApiResponse> {
    return this.request('/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  // Trainer endpoints
  async getTrainers(): Promise<ApiResponse> {
    return this.request('/trainers', {
      method: 'GET',
    });
  }

  async createTrainer(trainerData: any): Promise<ApiResponse> {
    return this.request('/trainers', {
      method: 'POST',
      body: JSON.stringify(trainerData),
    });
  }

  // Plan endpoints
  async getPlans(): Promise<ApiResponse> {
    return this.request('/plans', {
      method: 'GET',
    });
  }

  async createPlan(planData: any): Promise<ApiResponse> {
    return this.request('/plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  // Tenant endpoints
  async getTenants(): Promise<ApiResponse> {
    return this.request('/tenants', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
export default apiService; 