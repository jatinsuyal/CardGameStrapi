import socketio, { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { QueuePlayer, SocketToBattleSet, addToQueue, TurnData } from '../scripts/BattleManager';

export default {
  register() {},

  bootstrap({ strapi }) {
    const io = new socketio.Server(strapi.server.httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('searchBattle', (data) => {
        console.log('searchBattle');

        const { jwt: myJwt, characterId: charId } = data;
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          console.error('JWT_SECRET is not defined');
          socket.emit('error', { message: 'Server configuration error' });
          return;
        }

        try {
          const decoded = jwt.verify(myJwt, jwtSecret) as jwt.JwtPayload;
          const userId = decoded.id;

          const playerObjectForQueue: QueuePlayer = {
            userId: userId,
            characterId: charId,
            socket: socket
          };

          addToQueue(playerObjectForQueue);

          // socket.on('sendturn', (data: TurnData) => {
          //   const myBattle = SocketToBattleSet.get(socket);

          //   if (myBattle) {
          //     const turnResult = myBattle.doTurn(socket, data);

          //     if (turnResult) {
          //       const { winnerSocketId, loserSocketId } = turnResult;

          //       if (winnerSocketId) {
          //         io.to(winnerSocketId).emit('gameOver', { result: 'win' });
          //       }
          //       if (loserSocketId) {
          //         io.to(loserSocketId).emit('gameOver', { result: 'lose' });
          //       }
          //     }
          //   }
          // });

          socket.on('sendturn', (data: TurnData) => {
            const myBattle = SocketToBattleSet.get(socket);
        
            if (myBattle) {
                const turnResult = myBattle.doTurn(socket, data);
        
                if (turnResult) {
                    const { winnerSocketId, loserSocketId } = turnResult;
        
                    if (winnerSocketId) {
                        io.to(winnerSocketId).emit('gameOver', { result: 'win' });
                    }
                    if (loserSocketId) {
                        io.to(loserSocketId).emit('gameOver', { result: 'lose' });
                    }
                }
            }
        });
        
        } catch (err) {
          console.error('JWT verification failed:', err);
          socket.emit('error', { message: 'Invalid token' });
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    strapi.io = io;
  },
};
