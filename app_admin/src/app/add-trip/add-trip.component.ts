import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TripData} from "../auth/tripData";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripData
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Trip not found!");
      this.router.navigate(['']);
      return;
    }

    this.tripService.getTrip(tripCode)
      .then(data => {
        this.form.patchValue(data[0]);
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.tripService.updateTrip(this.form.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        })
        .catch(error => {
          console.error(error);
          // Handle error as needed
        });
    }
  }
}
