import { Component, OnInit, HostListener } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  windowScrolled: boolean;

  constructor(public router: Router, public route: ActivatedRoute,) {
    console.log(router.url);
   }

   @HostListener("window:scroll", [])

   onWindowScroll() {
       if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
           this.windowScrolled = true;
       }
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
           this.windowScrolled = false;
       }
   }

   scrollToTop() {
    (function smoothscroll() {

        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }

    })();
}

  ngOnInit() {
    this.router.events.subscribe(() =>
          window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
          })
      );
  }
}
