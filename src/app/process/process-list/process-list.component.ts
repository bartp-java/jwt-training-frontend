import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '../../shared/auth.service';
import {Process} from "../process.model";
import {DataRetrievalService} from "../../shared/data-retrieval.service";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  private userSub: Subscription;
  private isAuthenticated;

  processes: Process[];
  isLoading = false;
  errorMessage;

  constructor(private dataService: DataRetrievalService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.dataService.fetchProcesses().subscribe((processes: Process[]) => {
      this.processes = processes;
      this.isLoading = false;
    }, error => {
      this.errorMessage = error.message;
      this.isLoading = false;
    });
  }
}
