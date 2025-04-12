import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class AppComponent {
  tripForm: FormGroup;
  trips: { start: string; end: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({ trips: this.fb.array([]) });
    this.addTrip();
  }

  tripsArray(): FormArray {
    return this.tripForm.get('trips') as FormArray;
  }

  addTrip(): void {
    this.tripsArray().push(this.fb.group({ start: [''], end: [''] }));
  }

  submit(): void {
    this.trips = this.tripForm.value.trips;
  }

  getLevel(index: number): number {
    if (index === 0) return 1;
    const prev = this.trips[index - 1];
    const current = this.trips[index];
    if (prev.end === current.start) return 1;
    if (prev.start === current.start && prev.end === current.end) return 2;
    return 1;
  }
}
