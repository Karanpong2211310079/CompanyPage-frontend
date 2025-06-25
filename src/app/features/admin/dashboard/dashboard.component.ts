import { Component, OnInit  } from '@angular/core';
import { EmployeesService } from '../dashboard/employees.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  index:number = 1
  employees: any[] = [];
  constructor(private employeeService: EmployeesService){}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        console.log({response:
          this.employees
        })
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
  
  changeIndex(): void {
    this.index = this.index === 0 ? 1 : 0;
  }
}
