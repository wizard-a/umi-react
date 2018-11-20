import BTable from './basicTable';
import tableEffectHoc from './tableEffectHoc';
import Search from './crud/search';
import Create from './crud/create';
import Update from './crud/update';
import Del from './crud/del';

BTable.tableEffectHoc = tableEffectHoc;
BTable.Search = Search;
BTable.Create = Create;
BTable.Update = Update;
BTable.Del = Del;

export default BTable;
