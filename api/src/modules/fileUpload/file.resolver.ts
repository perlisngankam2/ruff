/* eslint-disable prettier/prettier */
// import { Resolver, Mutation, Args } from '@nestjs/graphql';
// // import { GraphQLUpload } from 'apollo-server-express';

// import { FileService } from './file.service';

// @Resolver()
// export class FileResolver {
//   constructor(private readonly fileService: FileService) {}

//   @Mutation(() => Boolean)
//   async uploadFile(
//     @Args({ name: 'file', type: () => GraphQLUpload }) file: Express.Multer.File,
//   ): Promise<File> {
//     return this.fileService.uploadFile(file);
//   }
// }