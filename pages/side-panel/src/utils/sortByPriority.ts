export function sortByPriority(items: any[], SortAsc: boolean): any[] {
  let priorityOrder = ['urgent', 'high', 'medium', 'low'];
  if (!SortAsc) priorityOrder = priorityOrder.reverse();

  return items.sort((a, b) => {
    return a.priority && b.priority && priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  });
}
