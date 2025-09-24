import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  person: any;
  quotes: { likes: number; text: string }[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.http.get<any>(`http://localhost:5001/details/${id}`).subscribe({
      next: (res) => {
        this.person = res;
        this.quotes = [];

        Object.entries(res.quotes).forEach(([likes, texts]) => {
          (texts as string[]).forEach((text) => {
            this.quotes.push({ likes: Number(likes), text });
          });
        });
        this.quotes.sort(
          (a, b) => b.likes - a.likes || a.text.localeCompare(b.text)
        );
      },
      error: () => {
        this.error = "Error loading details";
      },
    });
  }

  back(): void {
    this.router.navigate(["/"]);
  }
}
