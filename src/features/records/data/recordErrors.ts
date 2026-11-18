export class RecordNotFoundError extends Error {
  constructor() {
    super(
      'This record is no longer available. Return to History and choose another record.',
    );
    this.name = 'RecordNotFoundError';
  }
}

export class RecordDateConflictError extends Error {
  constructor() {
    super('Another record already uses that date. Choose a different date.');
    this.name = 'RecordDateConflictError';
  }
}
