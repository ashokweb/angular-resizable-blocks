import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular 5';

  private isResizing = false;
  private containerWidth: number = 0;
  stoppages: any = [
    {
      id: 1,
      color: 'red',
      size: 50,
      left: 50,
    },
    {
      id: 2,
      color: 'yellow',
      size: 10,
      left: 60,
    },
    {
      id: 3,
      color: 'blue',
      size: 25,
      left: 85,
    },
    {
      id: 4,
      color: 'orange',
      size: 15,
      left: 100,
    },
  ];

  constructor(private renderer: Renderer2) {}

  // Start resizing when the user clicks and drags the resizer
  onResizeStart(event: MouseEvent, prevStoppage: any): void {
    event.preventDefault();

    const currentIndex = this.stoppages.findIndex(
      (obj) => obj.id === prevStoppage.id
    );

    // Check if the next index exists and retrieve the next sibling object
    let nextStoppage = null;
    if (currentIndex !== -1 && currentIndex < this.stoppages.length - 1) {
      nextStoppage = this.stoppages[currentIndex + 1];
    }

    this.isResizing = true;
    const startX = event.clientX;
    this.containerWidth = (
      event.target as HTMLElement
    ).parentElement!.offsetWidth;
    const pxPercent = this.containerWidth / 100;

    const prevSib = (event.target as HTMLElement)
      .previousElementSibling as HTMLElement;
    let prevWidth = 0;
    if (prevSib) {
      prevWidth = parseFloat(prevSib.style.width);
    }

    const nextSib = (event.target as HTMLElement)
      .nextElementSibling as HTMLElement;
    let nextWidth = 0;
    if (nextSib) {
      nextWidth = parseFloat(nextSib.style.width);
    }

    // Listen for mousemove and mouseup events to handle resizing

    this.renderer.listen('document', 'mousemove', (event) =>
      this.onResize(
        event,
        startX,
        pxPercent,
        prevSib,
        prevWidth,
        nextSib,
        nextWidth,
        prevStoppage,
        nextStoppage
      )
    );
    this.renderer.listen('document', 'mouseup', this.onResizeEnd.bind(this));
  }

  // Resize the panels dynamically
  onResize(
    event: MouseEvent,
    startX: any,
    pxPercent: any,
    prevSib: any,
    prevWidth: any,
    nextSib: any,
    nextWidth: any,
    prevStoppage: any,
    nextStoppage: any
  ): void {
    if (this.isResizing) {
      if (prevSib && nextSib) {
        const movedAread = event.clientX - startX;
        const movedPercent = movedAread / pxPercent;
        const newPrevWidth = prevWidth + movedPercent;
        const newNextWidth = nextWidth - movedPercent;
        // console.log(
        //   this.startX,
        //   event.clientX,
        //   movedAread,
        //   this.prevWidth,
        //   this.pxPercent,
        //   movedPercent,
        //   newPrevWidth,
        //   'move'
        // );
        prevStoppage.size = newPrevWidth;
        // prevStoppage.left = newPrevWidth;
        nextStoppage.size = newNextWidth;
        // this.prevSib.style.width = `${newPrevWidth}%`;
        // this.nextSib.style.width = `${newNextWidth}%`;
        // nextSib.style.width = `${100 - newLeftPanelWidth}%`;
      }
    }
  }

  // Stop resizing when the user releases the mouse button
  onResizeEnd(): void {
    this.isResizing = false;
  }
}
