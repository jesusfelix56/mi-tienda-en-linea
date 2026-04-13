<div class="service">
  <label class="title">{{ props.label }}</label>

  <div class="options">
    <button
      *ngFor="let option of serviceOptions"
      [id]="buildOptionId(option.value)"
      class="option"
      type="button"
      [class.active]="isSelected(option.value)"
      (click)="selectService(option.value)"
    >
      <span class="name">{{ option.label }}</span>
      <span class="hint" *ngIf="option.hint">{{ option.hint }}</span>
    </button>
  </div>

  <small class="error" *ngIf="showError">{{
    props['requiredMessage'] || 'You must select a service type.'
  }}</small>
</div>

<main id="serviceContractView" class="page">
  <section class="card">
    <form [formGroup]="form" (ngSubmit)="submitForm()" novalidate>
      <p class="loadError" *ngIf="loadError">{{ loadError }}</p>
      <formly-form [form]="form" [fields]="fields" [model]="model" [options]="options"></formly-form>

      <div class="info" *ngIf="hasSelectedService">
        <span class="infoText">You are contracting {{ selectedServiceLabel }}.</span>
        <button id="switchServiceButton" class="switch" type="button" (click)="toggleService()">
          {{ toggleServiceLabel }}
        </button>
      </div>

      <div class="actions">
        <button id="clearButton" class="clear" type="button" (click)="clearForm()">Clear</button>
        <button id="submitButton" class="submit" type="submit">{{ submitLabel }}</button>
      </div>
    </form>
  </section>
</main>
