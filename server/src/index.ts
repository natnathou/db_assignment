import express, { Response, Request } from 'express';
import fs , {writeFile, readFile}from 'fs';
import path from 'path';
import { PostRequestApiSavestate } from './models/request/requestApiSavestate';
import { GetResponseApiSavestate, PostResponseApiSavestate } from './models/response/responseApiSavestate';
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/api/savestate', async (req: Request, res: Response) => {
  try{
    let body = req.body.data as PostRequestApiSavestate;
    const file = await fs.promises.writeFile(path.join(__dirname, '..' , 'src/db',"filename.txt"), JSON.stringify(body));
    let response: PostResponseApiSavestate = { message: "state was saved" }
  res.status(200).json(response);
  } catch (e){
    let response: PostResponseApiSavestate ={ message: "their are an error" }

  res.status(500).json(response);

  }
});

app.get('/api/savestate', async (req: Request, res: Response) => {
  try{
    const data = await fs.promises.readFile(path.join(__dirname, '..' , 'src/db',"filename.txt"), 'utf8')
    let response: GetResponseApiSavestate = JSON.parse(data)
    res.status(200).json(response);

  } catch(e){
    res.status(200).json({});
  }

});

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
