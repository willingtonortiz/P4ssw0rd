export interface GenericDAO<Type> {
	insert(item: Type): void;
	update(item: Type): boolean;
	delete(item: Type): boolean;
	getItem(id: number): Promise<{}>;
	getAll(): Promise<{}>;
}
