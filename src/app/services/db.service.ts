import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllClients() {
    console.log('Buscando clientes no Banco de Dados!');
    return this.http.get<any[]>(`${this.baseUrl}/clients`);
  }

  getClientsPaginated(page = 1, limit = 5) {
    console.log('Buscando clientes no Banco de Dados!');
    console.log('Página', page);
    console.log('Máximo', limit);

    return this.http.get<any[]>(
      `${this.baseUrl}/clients?_page=${page}&_limit=${limit}`,
      {
        observe: 'response',
        transferCache: { includeHeaders: ['X-Total-Count'] },
      }
    );
  }

  saveClientOnDb(clientObj: any) {
    console.log('Salvando no Banco de Dados!');
    console.log('cliente', clientObj);

    return this.http.post<any>(`${this.baseUrl}/clients`, clientObj);
  }

  deleteClientOnDb(clientId: number) {
    console.log('Deletando no Banco de Dados!');

    return this.http.delete(`${this.baseUrl}/clients/${clientId}`);
  }

  updateClientOnDb(clientId: number, user: any) {
    console.log('Atualizando no Banco de Dados!');

    return this.http.put(`${this.baseUrl}/clients/${clientId}`, user);
  }
}
