
import { Controller, Inject, OnModuleInit, Get, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { UserById } from './interfaces/userById.interface';
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { User } from './interfaces/user.interface';
import { CreateOneUser } from './interfaces/createUser';
import { JetStreamDataService } from '../jetStream/jetstreamservice';

interface UsersService {
    findOne(data: UserById): Observable<User>;
    findMany(upstream: Observable<UserById>): Observable<User>;
}
@Controller()
export class UserController implements OnModuleInit {
    private items: User[] = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
    ];
    public newUsers: any = { users: [] }
    private userService: UsersService
    constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc
        , private readonly jetStream: JetStreamDataService
    ) { }
    onModuleInit() {
        this.userService = this.client.getService<UsersService>('UsersService');
    }
    @GrpcMethod('UsersService', 'CreateUser')
    createUser(data: CreateOneUser): CreateOneUser[] {
        const users = this.newUsers.users.push(data)
        const newArray = { ...this.newUsers }
        console.log("her.......");
        console.log("data", data);
        this.jetStream.CreateStream("UserObject", "userData");
        // this.jetStream.
        // this.jetStream.Publish("userData", data)
        // console.log("===>", newArray)

        return newArray
    }
    @GrpcMethod('UsersService', 'FindOne')
    // findOne(data: UserById): User {
    //    return this.items.find() 
    // }
    @GrpcStreamMethod('UsersService', 'FindMany')
    findMany(data$: Observable<UserById>): Observable<User> {
        console.log("her.......")
        console.log("data", data$);
        const user$ = new Subject<User>();
        const onNext = (userById: UserById) => {
            const item = this.items.find(({ id }) => id === userById.id);
            console.log(item);
            user$.next(item)
        };
        const onComplete = () => user$.complete();
        data$.subscribe({
            next: onNext,
            complete: onComplete
        });
        console.log("===>", user$)

        return user$.asObservable();
    }
    @Get()
    getMany(): Observable<User[]> {
        const ids$ = new ReplaySubject<UserById>();
        ids$.next({ id: 1 });
        ids$.next({ id: 2 });
        ids$.complete();

        const stream = this.userService.findMany(ids$.asObservable());
        return stream.pipe(toArray());
    }
    @Get(':id')
    getById(@Param('id') id: string): Observable<User> {
        return this.userService.findOne({ id: +id });
    }

}