export class ApiResult {
  docs: [];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;


  constructor({
                docs,
                hasNextPage,
                hasPrevPage,
                limit,
                nextPage,
                page,
                pagingCounter,
                prevPage,
                totalDocs,
                totalPages
                // tslint:disable-next-line:max-line-length
              }: { docs: [], hasNextPage: boolean, hasPrevPage: boolean, limit: number, nextPage: number, page: number, pagingCounter: number, prevPage: number | null, totalDocs: number, totalPages: number }) {
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
