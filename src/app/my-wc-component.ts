import { LitElement, html, customElement, property } from 'lit-element';


@customElement('my-wc-component')
export class MyWcComponent extends LitElement {

  constructor() {
    super();
  }

  @property() message = '';

  render() {
    return html`
      <div>
        <h3>My WC Component!</h3>
        <p>${this.message}</p>
      </div>
    `;
  }
}