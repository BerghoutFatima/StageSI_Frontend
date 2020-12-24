import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient:HttpClient,private http:HttpClient) { }
  SERVER_URL: string = "http://localhost:8080/uploadFiles";  

  public upload(formData) {
    console.log("xxx")
    console.log("upload service function is called")
    console.log("www")
    console.log(formData)
    return this.http.post<FormData>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  postFile(file:File){
    return this.http.post("http://localhost:8080/uploadFiles",file);
  }
}
