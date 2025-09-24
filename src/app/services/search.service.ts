import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private results: any[] = [];
  private hasSearched = false;
  private formData: { name: string; color: string } = { name: "", color: "" };

  setResults(results: any[], hasSearched: boolean) {
    this.results = results;
    this.hasSearched = hasSearched;
  }

  getResults() {
    return this.results;
  }

  getHasSearched() {
    return this.hasSearched;
  }

  setFormData(name: string, color: string) {
    this.formData = { name, color };
  }

  getFormData() {
    return this.formData;
  }
}
