// src/services/socket.service.ts
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  // 连接 WebSocket
  connect(token?: string) {
    if (this.socket?.connected) {
      console.log("Socket 已连接");
      return;
    }

    this.socket = io("http://localhost:3000/room", {
      // 如果有 JWT 认证，可以放在这里
      auth: { token },
      // 或作为查询参数
      // query: { token },

      // 其他配置选项
      transports: ["websocket"], // 强制使用 WebSocket，不使用轮询
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // 监听连接事件
    this.socket.on("connect", () => {
      console.log("✅ WebSocket 已连接，ID:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ WebSocket 断开连接:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket 连接错误:", error);
    });
  }

  // 断开连接
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log("WebSocket 已断开");
    }
  }

  // 发送消息
  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn("WebSocket 未连接，消息发送失败");
      return;
    }
    this.socket.emit(event, data);
  }

  // 监听消息
  on(event: string, callback: (data: any) => void) {
    if (!this.socket) {
      console.warn("WebSocket 未初始化");
      return;
    }
    this.socket.on(event, callback);
  }

  // 移除监听
  off(event: string, callback?: (data: any) => void) {
    if (!this.socket) return;
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }

  // 获取连接状态
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // 获取 Socket ID
  getSocketId(): string | undefined {
    return this.socket?.id;
  }
}

// 导出单例
export const socketService = new SocketService();
