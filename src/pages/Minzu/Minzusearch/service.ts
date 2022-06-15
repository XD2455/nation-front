import { request } from 'umi';
import type { Params, MinzuDataType } from './data';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: MinzuDataType[] } }> {
  return request('/api/minzu/searchBy', {
    params,
  });
}
