export class AccordionComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="accordion" id="accordionExample" style = "width: 700px; margin-left: 20px;">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  ${data[0].title}
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="display: flex">
                  <img src="${data[0].src}" class="img-fluid" alt="фотография собаки" style="border-radius: 5px; margin-right: 10px;"> 
                  <p>${data[0].text}</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  ${data[1].title}
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="display: flex">
                  <img src="${data[1].src}" class="img-fluid" alt="фотография собаки" style="border-radius: 5px; margin-right: 10px;"> 
                  <p>${data[1].text}</p>
                </div>
              </div>
            </div>
          </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
