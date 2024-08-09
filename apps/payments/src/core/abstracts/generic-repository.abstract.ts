export abstract class IGenericRepository<T> {
  abstract getAll?(): Promise<T[]>; // find

  abstract get?(id: string): Promise<T>; // findOneBy({ id })

  abstract create?(item: T): Promise<T>; // create

  abstract update?(id: string, item: T): Promise<T>; // update

  abstract getAllBy?(options: { [key: string]: any }): Promise<T[]>; // findBy
}
