import { Component } from '@angular/core';
import { EmployeesService } from '../../admin/dashboard/employees.service';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
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
