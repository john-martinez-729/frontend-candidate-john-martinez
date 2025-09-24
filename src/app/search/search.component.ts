import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SearchService } from "../services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  form!: FormGroup;
  results: any[] = [];
  error: string | null = null;
  hasSearched = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [""],
      color: [""],
    });

    this.results = this.searchService.getResults();
    this.hasSearched = this.searchService.getHasSearched();
    const { name, color } = this.searchService.getFormData();
    this.form.patchValue({ name, color });
  }

  onSubmit(): void {
    this.hasSearched = true;
    const { name, color } = this.form.value;

    this.http
      .get<any>("http://localhost:5001/search", {
        params: { term: name, color },
      })
      .subscribe({
        next: (res) => {
          this.results = res.matches;
          this.error = null;

          this.searchService.setResults(this.results, this.hasSearched);
          this.searchService.setFormData(name, color);
        },
        error: () => {
          this.error = "Error fetching results";
          this.results = [];
          this.searchService.setResults(this.results, this.hasSearched);
          this.searchService.setFormData(name, color);
        },
      });
  }

  goToDetails(id: number): void {
    const { name, color } = this.form.value;
    this.searchService.setResults(this.results, this.hasSearched);
    this.searchService.setFormData(name, color);

    this.router.navigate(["/details", id]);
  }
}
