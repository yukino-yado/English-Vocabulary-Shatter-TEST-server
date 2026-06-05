import { json, methodNotAllowed } from '../server/http.js';
import { manageBook } from '../server/words-store.js';

export default {
  async fetch(request) {
    if(request.method !== 'POST') return methodNotAllowed(['POST']);
    try {
      const body = await request.json();
      const action = ['archive','restore','delete'].includes(body?.action) ? body.action : '';
      if(!action || !body?.bookId) return json({ error:'教材と操作内容を指定してください。' }, 400);
      const result = await manageBook({ bookId:body.bookId, action });
      return json({ ok:true, action, affectedBook:result.affectedBook, totalBooks:result.totalBooks, totalWords:result.totalWords, updatedAt:result.updatedAt });
    } catch(error) {
      return json({ error:error?.message || '教材の操作に失敗しました。' }, 500);
    }
  },
};
