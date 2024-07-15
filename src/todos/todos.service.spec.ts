import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { rejects } from 'assert';
import { resolve } from 'path';

describe('TodosService', () => {
  let service: TodosService;

  let fetchData=()=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve('data')
      }, (1000));
    })
  }

  let fetchDataReject=()=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        reject('Fail')
      }, 1000);
    })
  }

  let fetchwithCallback=(cb)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(cb)
      }, 1000);
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all todos', ()=>{
    const allTodos=service.findAll()
    expect(allTodos).toBe('This action returns all todos')
  })

  it('callback async function', (done)=>{
    function callback(error, data){
      if(error){
        done(error)
        return;
      }
      try {
        expect(data).toBe('data')
        done()
      } catch (error) {
        done(error)
      }
    }
    
    fetchwithCallback(callback(null, 'data'))
  })
});
