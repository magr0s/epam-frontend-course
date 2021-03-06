import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { Ticket, TicketDTO } from '../models/ticket';
import { environment } from 'src/environments/environment';
import { map, switchMap, takeWhile, combineAll } from 'rxjs/operators';
import { FilmsService } from './films.service';
import { RoomsService } from './rooms.service';
import { Film } from '../models/film';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseUrl = environment.baseApiUrl + 'tickets/';

  constructor(private http: HttpClient,
              private filmService: FilmsService,
              private roomService: RoomsService) { }

  inserTicket(ticket: Ticket): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(this.baseUrl, this.mapTicketToDTO(ticket));
  }

  getUserTickets(userId: string): Observable<Ticket[]> {
    return this.http.get<TicketDTO[]>(this.baseUrl, { params: { userId }}).pipe(
      switchMap(tickets => {
        if (!tickets.length) {
          return of([]);
        }
        return combineLatest(tickets.map(t => this.mapDTOToTicket(t)));
      })
    );
  }

  private mapDTOToTicket(ticketDTO: TicketDTO): Observable<Ticket> {
    const filmObservable = this.filmService.getFilmById(ticketDTO.filmId);
    const roomObservable = this.roomService.getRoomById(ticketDTO.roomId);
    return combineLatest([
      filmObservable, roomObservable
    ]).pipe(
      map(([film, room]) => ({ ...ticketDTO, film, room }))
    );
  }

  private mapTicketToDTO(ticket: Ticket): TicketDTO {
    return {
      ...ticket,
      roomId: ticket.room.id,
      filmId: ticket.film.id,
      room: undefined,
      film: undefined
    } as TicketDTO;
  }

}
