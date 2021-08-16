export class ApiResult {
  docs;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;


  constructor( docs = [],
               hasNextPage = false,
               hasPrevPage = false,
               limit = 0,
               nextPage = 1,
               page = 1,
               pagingCounter = 1,
               prevPage = 1,
               totalDocs = 0,
               totalPages = 1 ) {
    this.docs = docs;
    this.hasNextPage = hasNextPage;
    this.hasPrevPage = hasPrevPage;
    this.limit = limit;
    this.nextPage = nextPage;
    this.page = page;
    this.pagingCounter = pagingCounter;
    this.prevPage = prevPage;
    this.totalDocs = totalDocs;
    this.totalPages = totalPages;
  }
}
