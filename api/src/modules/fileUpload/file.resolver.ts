/* eslint-disable prettier/prettier */

// import { Resolver, Mutation, Args } from '@nestjs/graphql';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
// import { UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { File } from 'src/entities/file.entity';
// import { FileService } from './file.service';

// @Resolver(() => File)
// export class FileResolver {
//   constructor(private readonly fileService: FileService) {}

//   @Mutation(() => File)
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(
//     @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
//   ): Promise<File> {
//     return this.fileService.uploadFile(file);
//   }
// }
