const BASE_URL = import.meta.env.VITE_API_URL;

interface AuthResponse {
  token: string
  trainer: {
    id: string
    name: string
    email: string
  }
}

interface RegisterDto {
  name: string
  email: string
  password: string
}

interface LoginDto {
  email: string
  password: string
}
//Todo mejorar el tipado de error
async function handleResponse<AuthResponse>(response: Response): Promise<AuthResponse> {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Server error')
  }
  return response.json()
}

export const authApi = {
  register: (dto: RegisterDto): Promise<AuthResponse> =>
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(res => handleResponse<AuthResponse>(res)),

  login: (dto: LoginDto): Promise<AuthResponse> =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(res => handleResponse<AuthResponse>(res)),
}