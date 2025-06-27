import { Component } from '@angular/core';
import { EmployeesService } from '../../admin/dashboard/employees.service';
import { NgIf, NgForOf, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgForOf, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    index: number = 1;
  employees: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  allEmployees:number = 0

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.loadEmployees(this.currentPage);
  }

  loadEmployees(page: number): void {
    this.employeeService.getEmployees(page).subscribe({
      next: (res) => {
        this.employees = res.results ?? [];
        this.allEmployees = res.count
        this.currentPage = page;
        this.totalPages = Math.ceil(res.count / 10);  // assuming API returns count total items
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }

  changeIndex(): void {
    this.index = this.index === 0 ? 1 : 0;
  }

  goToPage(page: number): void {
    if(page >= 1 && page <= this.totalPages) {
      this.loadEmployees(page);
    }
  }
}