export class Common {
    public static readonly Module = 'Module';
    static Modules = class Modules {
        public static readonly BLOG = 'Blog';
        public static readonly ARTICLE = 'Article';
    }

    static Actions = class Actions {
        public static readonly CAN_READ = 'CanRead';
        public static readonly CAN_DELETE = 'CanDelete';
        public static readonly CAN_UPDATE = 'CanUpdate';
        public static readonly CAN_EXPORT = 'CanExport';
        public static readonly CAN_CREATE = 'CanCreate';
    }
}
