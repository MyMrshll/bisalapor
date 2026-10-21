import json
from pathlib import Path
from uuid import uuid4

OUT = Path('/media/shall/DATA_KERJA/BisaLapor/designs/bisalapor-v2.pen')
W, H = 1440, 1024
N = 0

VARS = {
    'bg': {'type': 'color', 'value': '#0F1E55'},
    'navy': {'type': 'color', 'value': '#0B1542'},
    'surface': {'type': 'color', 'value': '#14245F'},
    'surface2': {'type': 'color', 'value': '#192C70'},
    'inset': {'type': 'color', 'value': '#0B1642'},
    'ink': {'type': 'color', 'value': '#F5F7FF'},
    'muted': {'type': 'color', 'value': '#A8B5DF'},
    'line': {'type': 'color', 'value': '#2D418A'},
    'highlight': {'type': 'color', 'value': '#34509C'},
    'shadow': {'type': 'color', 'value': '#080F32'},
    'brand': {'type': 'color', 'value': '#17306F'},
    'blue': {'type': 'color', 'value': '#74A5FF'},
    'success': {'type': 'color', 'value': '#71D39B'},
    'warning': {'type': 'color', 'value': '#F5C76B'},
    'error': {'type': 'color', 'value': '#FF8D97'},
    'display': {'type': 'string', 'value': 'Inter'},
    'body': {'type': 'string', 'value': 'Inter'},
}


def nid(prefix='n'):
    global N
    N += 1
    return f'{prefix}{N:05d}'


def node(kind, name, **props):
    d = {'type': kind, 'id': nid(), 'name': name}
    d.update(props)
    return d


def text(name, content, x, y, w=None, h=None, size=14, color='$ink', weight='400', align=None):
    p = {'x': x, 'y': y, 'content': content, 'fill': color, 'fontFamily': '$body', 'fontSize': size, 'fontWeight': weight}
    if w is not None: p['width'] = w
    if h is not None: p['height'] = h
    if align: p['textAlign'] = align
    return node('text', name, **p)


def rect(name, x, y, w, h, fill='$surface', radius=14, stroke=None, stroke_width=1):
    p = {'x': x, 'y': y, 'width': w, 'height': h, 'fill': fill, 'cornerRadius': radius}
    if stroke:
        p['stroke'] = stroke
        p['strokeWidth'] = stroke_width
    return node('rectangle', name, **p)


def ellipse(name, x, y, w, h, fill='$blue', stroke=None):
    p = {'x': x, 'y': y, 'width': w, 'height': h, 'fill': fill}
    if stroke:
        p['stroke'] = stroke
        p['strokeWidth'] = 1
    return node('ellipse', name, **p)


def icon(name, glyph, x, y, size=18, color='$muted'):
    return node('icon', name, x=x, y=y, width=size, height=size, icon=glyph, library='lucide', fill=color)


def frame(name, x, y, w, h, children=None, fill=None, radius=0, stroke=None, layout='none'):
    p = {'x': x, 'y': y, 'width': w, 'height': h, 'layout': layout, 'children': children or []}
    if fill is not None: p['fill'] = fill
    if radius: p['cornerRadius'] = radius
    if stroke:
        p['stroke'] = stroke
        p['strokeWidth'] = 1
    return node('frame', name, **p)


def add(children, *items):
    children.extend(items)


def logo(children, x=30, y=28, compact=False):
    size = 34 if not compact else 28
    children.append(rect('BisaLapor logo tile', x, y, size, size, '$brand', 10, '$highlight'))
    children.append(text('BisaLapor monogram', 'B', x + (10 if not compact else 8), y + (2 if not compact else 1), size - 8, size - 4, 22 if not compact else 18, '$ink', '700'))
    if not compact:
        children.append(text('BisaLapor wordmark', 'BisaLapor', x + 46, y + 7, 140, 24, 17, '$ink', '700'))


def sidebar(active):
    c = []
    logo(c)
    c.append(text('Workspace label', 'WORKSPACE', 32, 92, 180, 16, 10, '$muted', '700'))
    items = [('LayoutDashboard', 'Overview'), ('ClipboardList', 'Work Orders'), ('FileCheck2', 'Reports'), ('Inbox', 'AI Inbox'), ('UsersRound', 'Technicians'), ('Building2', 'Customers'), ('Settings2', 'Settings')]
    y = 122
    for glyph, label in items:
        selected = label == active
        if selected:
            c.append(rect(f'{label} selected surface', 20, y - 7, 210, 44, '$surface2', 12, '$highlight'))
        c.append(icon(f'{label} icon', glyph, 34, y + 5, 18, '$blue' if selected else '$muted'))
        c.append(text(f'{label} navigation', label, 64, y + 4, 140, 22, 14, '$ink' if selected else '$muted', '600' if selected else '500'))
        y += 52
    c.append(rect('Sidebar divider', 28, 534, 194, 1, '$line', 0))
    c.append(text('OPERASIONAL', 'OPERASIONAL', 32, 560, 180, 16, 10, '$muted', '700'))
    c.append(icon('Help icon', 'CircleHelp', 34, 588, 18, '$muted'))
    c.append(text('Help navigation', 'Pusat bantuan', 64, 586, 140, 22, 14, '$muted', '500'))
    c.append(rect('Sidebar account surface', 20, 895, 210, 76, '$surface2', 14, '$highlight'))
    c.append(ellipse('Account avatar', 34, 916, 34, 34, '$brand', '$highlight'))
    c.append(text('Account initial', 'RP', 41, 923, 24, 18, 11, '$blue', '700', 'center'))
    c.append(text('Account name', 'Rafi Pratama', 78, 912, 125, 18, 13, '$ink', '600'))
    c.append(text('Account role', 'Administrator', 78, 934, 125, 16, 11, '$muted', '400'))
    c.append(icon('Account menu', 'MoreHorizontal', 193, 921, 16, '$muted'))
    return frame('Persistent sidebar', 0, 0, 250, H, c, '$navy')


def topbar(breadcrumb, page_label):
    c = []
    c.append(text('Top breadcrumb', breadcrumb, 286, 26, 500, 20, 13, '$muted', '500'))
    c.append(text('Top page label', page_label, 286, 47, 500, 22, 12, '$ink', '600'))
    c.append(rect('Topbar divider', 250, 75, 1190, 1, '$line', 0))
    c.append(icon('Global search icon', 'Search', 1110, 28, 18, '$muted'))
    c.append(icon('Notification icon', 'Bell', 1150, 28, 18, '$muted'))
    c.append(ellipse('Topbar avatar', 1190, 20, 34, 34, '$brand', '$highlight'))
    c.append(text('Topbar avatar initials', 'RP', 1196, 28, 22, 16, 10, '$blue', '700', 'center'))
    return frame('Top navigation bar', 250, 0, 1190, 76, c, '$surface')


def button(name, label, x, y, w, primary=True, icon_name=None):
    c = []
    if icon_name:
        c.append(icon(f'{name} icon', icon_name, x + 16, y + 12, 16, '$ink' if primary else '$blue'))
        c.append(text(f'{name} label', label, x + 40, y + 10, w - 52, 22, 13, '$ink' if primary else '$blue', '600'))
    else:
        c.append(text(f'{name} label', label, x + 16, y + 10, w - 32, 22, 13, '$ink' if primary else '$blue', '600', 'center'))
    return frame(name, x, y, w, 42, c, '$blue' if primary else '$surface2', 12, '$highlight')


def badge(name, label, x, y, w, color='$blue', bg='$brand'):
    return frame(name, x, y, w, 26, [ellipse(f'{name} dot', x + 10, y + 9, 7, 7, color), text(f'{name} text', label, x + 24, y + 4, w - 28, 18, 11, color, '600')], bg, 13)


def metric_card(title, value, detail, x, y, w=240, accent='$blue'):
    c = [text(f'{title} label', title.upper(), 20, 18, w - 40, 16, 10, '$muted', '700'), text(f'{title} value', value, 20, 41, w - 40, 38, 30, '$ink', '700'), text(f'{title} detail', detail, 20, 84, w - 40, 18, 11, '$muted', '400'), ellipse(f'{title} accent', w - 38, 20, 12, 12, accent)]
    return frame(f'Metric {title}', x, y, w, 124, c, '$surface', 16, '$highlight')


def card_title(c, title, subtitle, x, y, w):
    c.append(text(f'{title} title', title, x, y, w, 24, 16, '$ink', '700'))
    if subtitle:
        c.append(text(f'{title} subtitle', subtitle, x, y + 27, w, 18, 11, '$muted', '400'))


def page_shell(title, subtitle, active, breadcrumb):
    c = [sidebar(active), topbar(breadcrumb, title)]
    c.append(text('Page title', title, 286, 112, 700, 42, 30, '$ink', '700'))
    c.append(text('Page subtitle', subtitle, 286, 157, 700, 22, 13, '$muted', '400'))
    return c


def overview():
    c = page_shell('Overview', 'Ringkasan operasional workspace Anda hari ini.', 'Overview', 'Workspace / Overview')
    add(c, button('Create work order', 'Buat work order', 1160, 116, 220, True, 'Plus'))
    add(c, metric_card('Pekerjaan aktif', '12', '+3 dari minggu lalu', 286, 214, 250, '$blue'))
    add(c, metric_card('Menunggu review', '07', '2 membutuhkan perhatian', 552, 214, 250, '$warning'))
    add(c, metric_card('Butuh informasi', '03', 'Teknisi perlu melengkapi', 818, 214, 250, '$error'))
    add(c, metric_card('Disetujui minggu ini', '36', '92% tanpa revisi', 1084, 214, 296, '$success'))
    # Status chart
    chart = [rect('Chart surface', 286, 374, 540, 300, '$surface', 16, '$highlight')]
    card_title(chart, 'Status pekerjaan', 'Distribusi work order minggu ini', 310, 398, 360)
    chart += [text('Chart total', '42', 684, 400, 100, 32, 24, '$ink', '700', 'right'), text('Chart total label', 'total', 684, 432, 100, 16, 11, '$muted', '400', 'right')]
    chart += [rect('Chart baseline', 324, 622, 448, 1, '$line', 0)]
    values = [('OPEN', 70, '$blue'), ('ASSIGNED', 120, '$blue'), ('IN PROGRESS', 175, '$warning'), ('COMPLETED', 220, '$success')]
    x = 360
    for label, h, col in values:
        chart.append(rect(f'{label} bar shadow', x + 2, 622 - h + 2, 58, h, '$shadow', 12))
        chart.append(rect(f'{label} bar', x, 622 - h, 58, h, col, 12))
        chart.append(text(f'{label} chart label', label, x - 10, 635, 78, 28, 9, '$muted', '600', 'center'))
        x += 100
    c.append(frame('Work order status chart', 0, 0, 0, 0, chart))
    # Review queue
    queue = [rect('Review queue surface', 850, 374, 530, 300, '$surface', 16, '$highlight')]
    card_title(queue, 'Antrean review', 'Laporan yang perlu ditinjau hari ini', 874, 398, 320)
    queue.append(text('Review queue count', '7 laporan', 1248, 401, 100, 18, 11, '$blue', '600', 'right'))
    rows = [('Servis AC Split 2 PK', 'WO-240318-017', 'Perlu review', '$warning'), ('Maintenance genset 250 kVA', 'WO-240318-012', 'Butuh info', '$error'), ('Perawatan chiller gedung A', 'WO-240318-009', 'Draf siap', '$blue')]
    y = 452
    for title, ident, status, col in rows:
        queue.append(ellipse('Review row icon', 876, y + 5, 10, 10, col))
        queue.append(text('Review row title', title, 898, y, 275, 18, 12, '$ink', '600'))
        queue.append(text('Review row id', ident, 898, y + 20, 180, 16, 10, '$muted', '400'))
        queue.append(badge('Review row status', status, 1175, y - 3, 150, col, '$brand'))
        queue.append(rect('Review row divider', 876, y + 48, 448, 1, '$line', 0))
        y += 70
    queue.append(text('Open review queue', 'Lihat semua laporan  →', 876, 626, 200, 20, 12, '$blue', '600'))
    c.append(frame('Review queue', 0, 0, 0, 0, queue))
    # bottom cards
    activity = [rect('Activity surface', 286, 704, 690, 264, '$surface', 16, '$highlight')]
    card_title(activity, 'Aktivitas terbaru', 'Perubahan terakhir di workspace', 310, 728, 320)
    acts = [('Rafi menyetujui laporan WO-240318-004', '2 menit lalu', '$success'), ('Dina mengirim 3 foto dokumentasi', '18 menit lalu', '$blue'), ('AI menandai 2 informasi belum lengkap', '1 jam lalu', '$warning'), ('Work order baru dibuat oleh Rafi', '2 jam lalu', '$blue')]
    y = 780
    for label, when, col in acts:
        activity.append(ellipse('Activity dot', 312, y + 5, 8, 8, col))
        activity.append(text('Activity label', label, 334, y, 420, 18, 12, '$ink', '500'))
        activity.append(text('Activity time', when, 334, y + 20, 180, 16, 10, '$muted', '400'))
        y += 42
    c.append(frame('Activity feed', 0, 0, 0, 0, activity))
    ai = [rect('AI health surface', 1000, 704, 380, 264, '$surface', 16, '$highlight')]
    card_title(ai, 'AI processing', 'Status layanan hari ini', 1024, 728, 260)
    ai.append(ellipse('AI status dot', 1026, 790, 10, 10, '$success'))
    ai.append(text('AI status', 'Berjalan normal', 1046, 785, 180, 20, 13, '$success', '600'))
    ai.append(text('AI success label', 'Keberhasilan proses', 1024, 834, 180, 18, 11, '$muted', '400'))
    ai.append(text('AI success value', '96.4%', 1240, 828, 100, 28, 22, '$ink', '700', 'right'))
    ai.append(rect('AI progress track', 1024, 872, 312, 8, '$inset', 4))
    ai.append(rect('AI progress fill', 1024, 872, 280, 8, '$success', 4))
    ai.append(text('AI cost label', 'Estimasi biaya hari ini', 1024, 910, 180, 18, 11, '$muted', '400'))
    ai.append(text('AI cost value', 'Rp 48.200', 1210, 906, 126, 22, 14, '$ink', '600', 'right'))
    c.append(frame('AI processing health', 0, 0, 0, 0, ai))
    return frame('01 Overview Dashboard', 0, 0, W, H, c, '$bg')


def work_orders():
    c = page_shell('Work Orders', 'Kelola seluruh pekerjaan dan penugasan teknisi.', 'Work Orders', 'Workspace / Work Orders')
    add(c, button('Create work order', 'Buat work order', 1160, 116, 220, True, 'Plus'))
    c.append(rect('Work order search', 286, 214, 390, 44, '$surface', 12, '$highlight'))
    c.append(icon('Work order search icon', 'Search', 304, 227, 17, '$muted'))
    c.append(text('Work order search placeholder', 'Cari nomor, pelanggan, atau lokasi...', 334, 225, 320, 20, 12, '$muted', '400'))
    c.append(button('Filter status', 'Semua status', 694, 214, 150, False, 'ListFilter'))
    c.append(button('Filter period', '22–28 Jul 2024', 858, 214, 174, False, 'CalendarDays'))
    c.append(button('Export work orders', 'Export', 1240, 214, 140, False, 'Download'))
    table = [rect('Work orders table surface', 286, 292, 1094, 676, '$surface', 16, '$highlight')]
    headers = [('PEKERJAAN', 310, 230), ('PELANGGAN', 560, 150), ('TEKNISI', 730, 150), ('TANGGAL', 880, 120), ('STATUS', 1010, 160), ('LAPORAN', 1180, 150)]
    for label, x, w in headers: table.append(text(f'Work order header {label}', label, x, 320, w, 18, 10, '$muted', '700'))
    table.append(rect('Work order table header line', 310, 350, 1040, 1, '$line', 0))
    rows = [
        ('Servis AC Split 2 PK', 'WO-240318-017', 'PT Arunika', 'Dina K.', '22 Jul 2024', 'Dikerjakan', '$warning', 'Belum ada', '$muted'),
        ('Instalasi jaringan kantor', 'WO-240318-016', 'CV Nusa Data', 'Budi S.', '22 Jul 2024', 'Dikerjakan', '$warning', 'Draf', '$blue'),
        ('Maintenance genset 250 kVA', 'WO-240318-012', 'PT Sinar Jaya', 'Dina K.', '21 Jul 2024', 'Dikerjakan', '$warning', 'Perlu review', '$warning'),
        ('Perawatan chiller gedung A', 'WO-240318-009', 'PT Arunika', 'Rafi P.', '20 Jul 2024', 'Dijadwalkan', '$blue', 'Belum ada', '$muted'),
        ('Servis AC cassette lantai 3', 'WO-240318-004', 'PT Meridian', 'Budi S.', '19 Jul 2024', 'Selesai', '$success', 'Disetujui', '$success'),
        ('Pemeriksaan panel listrik', 'WO-240318-001', 'CV Nusa Data', 'Dina K.', '18 Jul 2024', 'Selesai', '$success', 'Disetujui', '$success'),
    ]
    y = 374
    for i, row in enumerate(rows):
        title, ident, cust, tech, date, js, jc, rs, rc = row
        table.append(text(f'WO {i} title', title, 310, y, 235, 18, 12, '$ink', '600'))
        table.append(text(f'WO {i} ident', ident, 310, y + 21, 180, 16, 10, '$muted', '400'))
        table.append(text(f'WO {i} customer', cust, 560, y + 7, 145, 18, 12, '$ink', '500'))
        table.append(text(f'WO {i} tech', tech, 730, y + 7, 130, 18, 12, '$ink', '500'))
        table.append(text(f'WO {i} date', date, 880, y + 7, 110, 18, 11, '$muted', '500'))
        table.append(badge(f'WO {i} job status', js, 1010, y + 2, 140, jc, '$brand'))
        table.append(badge(f'WO {i} report status', rs, 1180, y + 2, 154, rc, '$brand'))
        table.append(icon(f'WO {i} menu', 'MoreHorizontal', 1340, y + 8, 17, '$muted'))
        table.append(rect(f'WO {i} divider', 310, y + 51, 1040, 1, '$line', 0))
        y += 92
    c.append(frame('Work orders data table', 0, 0, 0, 0, table))
    return frame('02 Work Orders', 1540, 0, W, H, c, '$bg')


def work_order_detail():
    c = page_shell('Servis AC Split 2 PK', 'WO-240318-017 · Detail pekerjaan', 'Work Orders', 'Work Orders / WO-240318-017')
    add(c, badge('Work order detail status', 'Dikerjakan', 1050, 119, 125, '$warning', '$brand'), button('Mark completed', 'Tandai selesai', 1190, 116, 190, True, 'CheckCircle2'))
    # summary
    summary = [rect('Work order summary surface', 286, 214, 1094, 142, '$surface', 16, '$highlight')]
    fields = [('PELANGGAN', 'PT Arunika', 310), ('LOKASI', 'Gedung Arunika, Lt. 5', 500), ('TEKNISI', 'Dina Kartika', 720), ('JADWAL', '22 Jul 2024 · 09:00', 930), ('DIBUAT', '18 Jul 2024', 1170)]
    for label, value, x in fields:
        summary.append(text(f'Detail {label} label', label, x, 240, 170, 16, 10, '$muted', '700'))
        summary.append(text(f'Detail {label} value', value, x, 267, 190, 20, 13, '$ink', '600'))
    summary.append(text('Work order description', 'Servis rutin AC split 2 PK — unit tidak dingin dan mengeluarkan suara berisik.', 310, 317, 620, 20, 12, '$muted', '400'))
    c.append(frame('Work order summary', 0, 0, 0, 0, summary))
    # timeline
    left = [rect('Work order timeline surface', 286, 382, 650, 586, '$surface', 16, '$highlight')]
    card_title(left, 'Aktivitas pekerjaan', 'Jejak pekerjaan dan dokumentasi', 310, 406, 340)
    timeline = [('Work order dibuat', '18 Jul · Rafi Pratama', '$blue'), ('Teknisi ditugaskan', '18 Jul · Dina Kartika', '$blue'), ('Pekerjaan dimulai', '22 Jul · 09:12', '$warning'), ('Dokumentasi diterima', '22 Jul · 11:40 · 3 file', '$success')]
    y = 470
    for i, (label, meta, col) in enumerate(timeline):
        left.append(ellipse(f'Timeline {i} dot', 322, y + 2, 12, 12, col))
        if i < len(timeline) - 1: left.append(rect(f'Timeline {i} line', 327, y + 14, 2, 54, '$line', 0))
        left.append(text(f'Timeline {i} label', label, 354, y - 3, 320, 20, 13, '$ink', '600'))
        left.append(text(f'Timeline {i} meta', meta, 354, y + 21, 320, 18, 11, '$muted', '400'))
        y += 76
    left.append(rect('Technician note inset', 310, 790, 602, 136, '$inset', 14, '$line'))
    left.append(text('Technician note label', 'CATATAN TEKNISI', 332, 812, 180, 16, 10, '$muted', '700'))
    left.append(text('Technician note', 'Unit indoor berdebu, filter sangat kotor. Tekanan refrigerant rendah. Menunggu konfirmasi spare part.', 332, 840, 540, 50, 12, '$ink', '400'))
    c.append(frame('Work order activity timeline', 0, 0, 0, 0, left))
    # right
    right = [rect('Work order assignment surface', 964, 382, 416, 586, '$surface', 16, '$highlight')]
    card_title(right, 'Penugasan', 'Orang dan status pekerjaan', 988, 406, 300)
    right.append(ellipse('Assigned technician avatar', 988, 462, 42, 42, '$brand', '$highlight'))
    right.append(text('Assigned technician initials', 'DK', 997, 475, 24, 16, 11, '$blue', '700', 'center'))
    right.append(text('Assigned technician name', 'Dina Kartika', 1046, 462, 210, 20, 13, '$ink', '600'))
    right.append(text('Assigned technician role', 'Teknisi lapangan', 1046, 486, 210, 18, 11, '$muted', '400'))
    right.append(rect('Assignment divider', 988, 530, 368, 1, '$line', 0))
    right.append(text('Progress label', 'PROGRESS PEKERJAAN', 988, 558, 200, 16, 10, '$muted', '700'))
    steps = [('Dijadwalkan', True), ('Dikerjakan', True), ('Selesai', False)]
    y = 596
    for label, done in steps:
        right.append(ellipse(f'Progress {label} dot', 992, y, 14, 14, '$success' if done else '$inset', '$success' if done else '$line'))
        right.append(text(f'Progress {label} label', label, 1022, y - 3, 180, 20, 12, '$ink' if done else '$muted', '600' if done else '400'))
        if label != 'Selesai': right.append(rect(f'Progress {label} line', 998, y + 14, 2, 34, '$line', 0))
        y += 52
    right.append(rect('Attachment count surface', 988, 780, 368, 86, '$inset', 12, '$line'))
    right.append(icon('Attachment icon', 'Paperclip', 1008, 802, 18, '$blue'))
    right.append(text('Attachment label', 'Dokumentasi pekerjaan', 1038, 794, 240, 18, 12, '$ink', '600'))
    right.append(text('Attachment count', '3 file · 2 foto · 1 audio', 1038, 818, 240, 18, 11, '$muted', '400'))
    right.append(button('Open documentation', 'Buka dokumentasi', 988, 888, 368, False, 'ArrowUpRight'))
    c.append(frame('Work order assignment', 0, 0, 0, 0, right))
    return frame('03 Work Order Detail', 3080, 0, W, H, c, '$bg')


def reports():
    c = page_shell('Reports', 'Tinjau, revisi, dan setujui laporan pekerjaan.', 'Reports', 'Workspace / Reports')
    add(c, button('Create manual report', 'Buat laporan manual', 1130, 116, 250, True, 'Plus'))
    tabs = [('Semua laporan', True), ('Perlu review', False), ('Butuh informasi', False), ('Disetujui', False)]
    x = 286
    for label, selected in tabs:
        w = 150 if label == 'Semua laporan' else 145
        c.append(text(f'Report tab {label}', label, x, 218, w, 22, 13, '$blue' if selected else '$muted', '600' if selected else '500'))
        if selected: c.append(rect(f'Report tab underline {label}', x, 248, w - 14, 3, '$blue', 2))
        x += w + 10
    c.append(rect('Reports tab line', 286, 251, 1094, 1, '$line', 0))
    c.append(rect('Report search', 286, 280, 390, 44, '$surface', 12, '$highlight'))
    c.append(icon('Report search icon', 'Search', 304, 293, 17, '$muted'))
    c.append(text('Report search placeholder', 'Cari laporan atau nomor work order...', 334, 291, 320, 20, 12, '$muted', '400'))
    c.append(button('Report filter', 'Filter status', 694, 280, 150, False, 'ListFilter'))
    c.append(button('Report export', 'Export', 1240, 280, 140, False, 'Download'))
    table = [rect('Reports table surface', 286, 358, 1094, 610, '$surface', 16, '$highlight')]
    headers = [('LAPORAN', 310, 270), ('WORK ORDER', 600, 180), ('TEKNISI', 800, 130), ('DIPERBARUI', 950, 130), ('STATUS', 1100, 180)]
    for label, x, w in headers: table.append(text(f'Report header {label}', label, x, 386, w, 18, 10, '$muted', '700'))
    table.append(rect('Report table header line', 310, 416, 1040, 1, '$line', 0))
    rows = [('Servis AC Split 2 PK', 'RPT-240318-017', 'WO-240318-017', 'Dina K.', '2 mnt lalu', 'Perlu review', '$warning'), ('Maintenance genset 250 kVA', 'RPT-240318-012', 'WO-240318-012', 'Dina K.', '1 jam lalu', 'Butuh informasi', '$error'), ('Instalasi jaringan kantor', 'RPT-240318-016', 'WO-240318-016', 'Budi S.', '3 jam lalu', 'Draf', '$blue'), ('Servis AC cassette lantai 3', 'RPT-240318-004', 'WO-240318-004', 'Budi S.', 'Kemarin', 'Disetujui', '$success'), ('Pemeriksaan panel listrik', 'RPT-240318-001', 'WO-240318-001', 'Dina K.', 'Kemarin', 'Disetujui', '$success')]
    y = 440
    for i, row in enumerate(rows):
        title, ident, wo, tech, updated, status, col = row
        table.append(text(f'Report {i} title', title, 310, y, 270, 18, 12, '$ink', '600'))
        table.append(text(f'Report {i} ident', ident, 310, y + 21, 210, 16, 10, '$muted', '400'))
        table.append(text(f'Report {i} wo', wo, 600, y + 8, 180, 18, 11, '$blue', '500'))
        table.append(text(f'Report {i} tech', tech, 800, y + 8, 120, 18, 12, '$ink', '500'))
        table.append(text(f'Report {i} updated', updated, 950, y + 8, 120, 18, 11, '$muted', '500'))
        table.append(badge(f'Report {i} status', status, 1100, y + 2, 180, col, '$brand'))
        table.append(icon(f'Report {i} menu', 'MoreHorizontal', 1328, y + 8, 17, '$muted'))
        table.append(rect(f'Report {i} divider', 310, y + 52, 1040, 1, '$line', 0))
        y += 94
    c.append(frame('Reports data table', 0, 0, 0, 0, table))
    return frame('04 Reports', 4620, 0, W, H, c, '$bg')


def report_review():
    c = page_shell('Review laporan', 'RPT-240318-017 · Servis AC Split 2 PK', 'Reports', 'Reports / RPT-240318-017')
    c.append(badge('Review status', 'Perlu review', 980, 119, 135, '$warning', '$brand'))
    c.append(button('Request information', 'Minta informasi', 1128, 116, 158, False, 'MessageCircleQuestion'))
    c.append(button('Approve report', 'Setujui laporan', 1296, 116, 168, True, 'Check'))
    # source panel
    source = [rect('Source panel', 286, 214, 420, 754, '$surface', 16, '$highlight')]
    card_title(source, 'Sumber dokumentasi', 'Input yang digunakan AI', 310, 238, 290)
    source.append(badge('Source verified', 'Pengirim terverifikasi', 310, 290, 180, '$success', '$brand'))
    source.append(text('Source sender label', 'Dina Kartika · Telegram', 310, 338, 300, 18, 12, '$ink', '600'))
    source.append(text('Source timestamp', '22 Jul 2024 · 11:40', 310, 362, 250, 18, 11, '$muted', '400'))
    source.append(rect('Source message', 310, 402, 372, 112, '$inset', 12, '$line'))
    source.append(text('Source message text', '“AC lantai 5 sudah dibersihkan. Filter sangat kotor dan tekanan freon rendah. Foto menyusul.”', 328, 424, 330, 72, 12, '$ink', '400'))
    source.append(text('Source media label', 'MEDIA · 3 FILE', 310, 554, 180, 16, 10, '$muted', '700'))
    for i, label in enumerate(['Sebelum', 'Proses', 'Sesudah']):
        x = 310 + i * 121
        source.append(rect(f'Source photo {i}', x, 584, 108, 86, '$brand', 12, '$highlight'))
        source.append(rect(f'Source photo wall {i}', x + 10, 596, 88, 50, '$surface2', 7))
        source.append(rect(f'Source photo unit {i}', x + 26, 610, 56, 20, '$navy', 4))
        source.append(text(f'Source photo label {i}', label, x, 678, 108, 16, 10, '$muted', '500', 'center'))
    source.append(rect('Source audio', 310, 724, 372, 62, '$inset', 12, '$line'))
    source.append(icon('Source audio icon', 'Volume2', 330, 745, 18, '$blue'))
    source.append(text('Source audio name', 'voice-note-240722.m4a', 362, 735, 220, 18, 11, '$ink', '600'))
    source.append(text('Source audio duration', '00:18', 362, 758, 120, 16, 10, '$muted', '400'))
    source.append(icon('Source audio play', 'Play', 638, 742, 20, '$blue'))
    source.append(text('Source traceability', 'Semua field di draft memiliki sumber yang dapat ditelusuri.', 310, 846, 340, 40, 11, '$muted', '400'))
    c.append(frame('Report source evidence', 0, 0, 0, 0, source))
    # draft
    draft = [rect('Draft panel', 730, 214, 650, 754, '$surface', 16, '$highlight')]
    draft.append(text('Draft panel label', 'DRAFT LAPORAN · AI GENERATED', 758, 240, 320, 16, 10, '$blue', '700'))
    draft.append(text('Draft report title', 'Servis AC Split 2 PK', 758, 270, 420, 28, 20, '$ink', '700'))
    draft.append(text('Draft report meta', 'RPT-240318-017 · Versi 1 · Diperbarui 2 menit lalu', 758, 307, 460, 18, 11, '$muted', '400'))
    draft.append(rect('Draft divider', 758, 342, 594, 1, '$line', 0))
    sections = [('Ringkasan', 'Unit indoor telah dibersihkan dan filter diganti. Tekanan refrigerant terdeteksi rendah.'), ('Temuan', 'Filter dalam kondisi sangat kotor. Terdapat indikasi tekanan refrigerant rendah.'), ('Tindakan', 'Membersihkan unit indoor dan mengganti filter. Pemeriksaan refrigerant direkomendasikan.'), ('Rekomendasi', 'Lakukan pengisian refrigerant setelah teknisi memverifikasi kebocoran pada sistem.')]
    y = 370
    for label, body in sections:
        draft.append(text(f'Draft {label} label', label, 758, y, 170, 18, 12, '$blue', '700'))
        draft.append(text(f'Draft {label} body', body, 758, y + 25, 560, 42, 12, '$ink', '400'))
        if label in ('Temuan', 'Rekomendasi'):
            draft.append(badge(f'Draft {label} source', 'Perlu verifikasi', 1188, y - 4, 142, '$warning', '$brand'))
        y += 104
    draft.append(rect('Missing info warning', 758, 804, 594, 74, '$inset', 12, '$warning'))
    draft.append(icon('Missing info icon', 'TriangleAlert', 778, 828, 17, '$warning'))
    draft.append(text('Missing info title', '2 informasi perlu dikonfirmasi', 806, 813, 300, 18, 12, '$warning', '700'))
    draft.append(text('Missing info body', 'Nomor seri unit dan hasil pengukuran akhir belum tersedia.', 806, 837, 450, 18, 11, '$muted', '400'))
    c.append(frame('Report draft editor', 0, 0, 0, 0, draft))
    return frame('05 Report Review', 6160, 0, W, H, c, '$bg')


def ai_inbox():
    c = page_shell('AI Inbox', 'Semua dokumentasi masuk dari kanal terintegrasi.', 'AI Inbox', 'Workspace / AI Inbox')
    c.append(badge('Inbox processing status', 'AI processing normal', 1090, 119, 180, '$success', '$brand'))
    c.append(button('Process inbox', 'Proses ulang terpilih', 1280, 116, 184, False, 'RefreshCw'))
    # list
    left = [rect('Inbox list surface', 286, 214, 484, 754, '$surface', 16, '$highlight')]
    left.append(text('Inbox list title', 'Pesan masuk', 312, 240, 220, 24, 16, '$ink', '700'))
    left.append(text('Inbox list count', '12 belum diproses', 312, 270, 220, 18, 11, '$muted', '400'))
    left.append(rect('Inbox search', 312, 306, 432, 40, '$inset', 10, '$line'))
    left.append(icon('Inbox search icon', 'Search', 328, 317, 16, '$muted'))
    left.append(text('Inbox search placeholder', 'Cari pesan atau pengirim...', 354, 315, 350, 18, 11, '$muted', '400'))
    msgs = [('Dina Kartika', 'AC lantai 5 sudah dibersihkan...', '2 mnt', 'Perlu konfirmasi', '$warning'), ('Budi Santoso', 'Foto hasil instalasi jaringan...', '18 mnt', 'Draf dibuat', '$blue'), ('Dina Kartika', 'Voice note · 00:18', '1 jam', 'Diproses', '$success'), ('Rafi Pratama', 'Work order baru untuk PT Arunika', '2 jam', 'Terhubung', '$success')]
    y = 378
    for i, (sender, preview, when, status, col) in enumerate(msgs):
        selected = i == 0
        if selected: left.append(rect(f'Inbox selected row {i}', 300, y - 12, 456, 86, '$surface2', 12, '$highlight'))
        left.append(ellipse(f'Inbox avatar {i}', 318, y, 34, 34, '$brand', '$highlight'))
        left.append(text(f'Inbox initials {i}', ''.join(x[0] for x in sender.split()[:2]), 323, y + 10, 24, 14, 9, '$blue', '700', 'center'))
        left.append(text(f'Inbox sender {i}', sender, 366, y - 2, 180, 18, 12, '$ink', '600'))
        left.append(text(f'Inbox time {i}', when, 670, y - 2, 62, 18, 10, '$muted', '400', 'right'))
        left.append(text(f'Inbox preview {i}', preview, 366, y + 21, 330, 18, 11, '$muted', '400'))
        left.append(badge(f'Inbox status {i}', status, 366, y + 47, 140, col, '$brand'))
        y += 115
    c.append(frame('AI Inbox message list', 0, 0, 0, 0, left))
    # detail
    right = [rect('Inbox detail surface', 794, 214, 586, 754, '$surface', 16, '$highlight')]
    right.append(text('Inbox detail label', 'MESSAGE DETAIL', 820, 240, 220, 16, 10, '$muted', '700'))
    right.append(text('Inbox detail sender', 'Dina Kartika', 820, 270, 260, 24, 17, '$ink', '700'))
    right.append(text('Inbox detail meta', 'Telegram · 22 Jul 2024 · 11:40', 820, 301, 320, 18, 11, '$muted', '400'))
    right.append(rect('Inbox message bubble', 820, 344, 514, 106, '$inset', 14, '$line'))
    right.append(text('Inbox message body', '“AC lantai 5 sudah dibersihkan. Filter sangat kotor dan tekanan freon rendah. Foto menyusul.”', 842, 366, 470, 56, 12, '$ink', '400'))
    right.append(text('Inbox linked work order label', 'WORK ORDER TERKAIT', 820, 488, 220, 16, 10, '$muted', '700'))
    right.append(rect('Inbox linked work order', 820, 516, 514, 74, '$surface2', 12, '$highlight'))
    right.append(icon('Inbox link icon', 'Link2', 842, 540, 18, '$blue'))
    right.append(text('Inbox linked work order title', 'Servis AC Split 2 PK', 876, 528, 280, 18, 12, '$ink', '600'))
    right.append(text('Inbox linked work order id', 'WO-240318-017 · PT Arunika', 876, 552, 280, 18, 11, '$muted', '400'))
    right.append(badge('Inbox ambiguity', 'Konfirmasi dibutuhkan', 1170, 538, 144, '$warning', '$brand'))
    right.append(text('Inbox suggested action label', 'TINDAKAN', 820, 632, 160, 16, 10, '$muted', '700'))
    right.append(text('Inbox suggested action', 'AI menemukan dua work order yang mungkin cocok. Pilih salah satu untuk melanjutkan pembuatan draf.', 820, 660, 470, 40, 12, '$ink', '400'))
    right.append(button('Confirm work order', 'Konfirmasi work order', 820, 728, 220, True, 'Check'))
    right.append(button('Create manual draft', 'Buat manual', 1054, 728, 170, False, 'FilePlus2'))
    right.append(text('Inbox original preserved', 'Pesan asli akan selalu disimpan untuk audit dan traceability.', 820, 812, 480, 18, 11, '$muted', '400'))
    c.append(frame('AI Inbox message detail', 0, 0, 0, 0, right))
    return frame('06 AI Inbox', 7700, 0, W, H, c, '$bg')


def technicians():
    c = page_shell('Technicians', 'Kelola anggota tim lapangan dan penugasan mereka.', 'Technicians', 'Workspace / Technicians')
    add(c, button('Invite technician', 'Undang teknisi', 1190, 116, 190, True, 'UserPlus'))
    c.append(rect('Technician search', 286, 214, 390, 44, '$surface', 12, '$highlight'))
    c.append(icon('Technician search icon', 'Search', 304, 227, 17, '$muted'))
    c.append(text('Technician search placeholder', 'Cari nama atau email...', 334, 225, 320, 20, 12, '$muted', '400'))
    c.append(button('Technician status filter', 'Semua status', 694, 214, 150, False, 'ListFilter'))
    c.append(text('Technician count', '6 teknisi aktif', 1210, 228, 170, 18, 11, '$muted', '500', 'right'))
    table = [rect('Technician table surface', 286, 292, 1094, 676, '$surface', 16, '$highlight')]
    headers = [('TEKNISI', 310, 300), ('STATUS', 640, 130), ('PEKERJAAN AKTIF', 810, 160), ('LAPORAN', 1000, 150), ('AKSI', 1270, 80)]
    for label, x, w in headers: table.append(text(f'Technician header {label}', label, x, 320, w, 18, 10, '$muted', '700'))
    table.append(rect('Technician header divider', 310, 350, 1040, 1, '$line', 0))
    rows = [('Dina Kartika', 'dina@arunika.id', 'Aktif', '2 pekerjaan', '12 laporan', '$success'), ('Budi Santoso', 'budi@nusadata.id', 'Aktif', '1 pekerjaan', '9 laporan', '$success'), ('Rafi Pratama', 'rafi@bisalapor.id', 'Aktif', '3 pekerjaan', '18 laporan', '$success'), ('Andi Wijaya', 'andi@meridian.id', 'Aktif', '0 pekerjaan', '7 laporan', '$success'), ('Sari Ningsih', 'sari@arunika.id', 'Nonaktif', '—', '5 laporan', '$muted')]
    y = 374
    for i, (name, email, status, jobs, reports_count, col) in enumerate(rows):
        table.append(ellipse(f'Technician avatar {i}', 312, y + 1, 38, 38, '$brand', '$highlight'))
        table.append(text(f'Technician initials {i}', ''.join(x[0] for x in name.split()[:2]), 319, y + 12, 24, 14, 10, '$blue', '700', 'center'))
        table.append(text(f'Technician name {i}', name, 366, y, 240, 18, 12, '$ink', '600'))
        table.append(text(f'Technician email {i}', email, 366, y + 21, 240, 16, 10, '$muted', '400'))
        table.append(badge(f'Technician status {i}', status, 640, y + 7, 112, col, '$brand'))
        table.append(text(f'Technician jobs {i}', jobs, 810, y + 8, 150, 18, 12, '$ink', '500'))
        table.append(text(f'Technician reports {i}', reports_count, 1000, y + 8, 150, 18, 12, '$ink', '500'))
        table.append(icon(f'Technician menu {i}', 'MoreHorizontal', 1300, y + 8, 17, '$muted'))
        table.append(rect(f'Technician divider {i}', 310, y + 58, 1040, 1, '$line', 0))
        y += 106
    c.append(frame('Technicians data table', 0, 0, 0, 0, table))
    return frame('07 Technicians', 9240, 0, W, H, c, '$bg')


def customers():
    c = page_shell('Customers', 'P1 · Direktori pelanggan dan riwayat pekerjaan.', 'Customers', 'Workspace / Customers')
    add(c, button('Create customer', 'Tambah pelanggan', 1190, 116, 190, True, 'Plus'))
    c.append(rect('Customer search', 286, 214, 390, 44, '$surface', 12, '$highlight'))
    c.append(icon('Customer search icon', 'Search', 304, 227, 17, '$muted'))
    c.append(text('Customer search placeholder', 'Cari nama pelanggan...', 334, 225, 320, 20, 12, '$muted', '400'))
    c.append(text('Customer count', '18 pelanggan', 1210, 228, 170, 18, 11, '$muted', '500', 'right'))
    grid = [rect('Customer grid surface', 286, 292, 1094, 676, '$surface', 16, '$highlight')]
    customers_data = [('PT Arunika', 'Gedung Arunika', '12 work orders', '4 laporan aktif'), ('CV Nusa Data', 'Kantor Pusat', '8 work orders', '2 laporan aktif'), ('PT Sinar Jaya', 'Pabrik Cikarang', '6 work orders', '1 laporan aktif'), ('PT Meridian', 'Gedung Meridian', '5 work orders', '0 laporan aktif')]
    positions = [(310, 326), (842, 326), (310, 590), (842, 590)]
    for i, ((name, location, orders, reports_count), (x, y)) in enumerate(zip(customers_data, positions)):
        grid.append(rect(f'Customer card {i}', x, y, 488, 220, '$surface2', 16, '$highlight'))
        grid.append(ellipse(f'Customer logo {i}', x + 24, y + 24, 48, 48, '$brand', '$highlight'))
        grid.append(text(f'Customer logo text {i}', name[3:5].upper() if name.startswith('PT ') else name[:2].upper(), x + 34, y + 40, 28, 16, 11, '$blue', '700', 'center'))
        grid.append(text(f'Customer name {i}', name, x + 88, y + 26, 300, 24, 16, '$ink', '700'))
        grid.append(text(f'Customer location {i}', location, x + 88, y + 55, 300, 18, 11, '$muted', '400'))
        grid.append(rect(f'Customer card divider {i}', x + 24, y + 96, 440, 1, '$line', 0))
        grid.append(text(f'Customer orders label {i}', 'WORK ORDERS', x + 24, y + 122, 160, 16, 10, '$muted', '700'))
        grid.append(text(f'Customer orders value {i}', orders, x + 24, y + 145, 180, 20, 13, '$ink', '600'))
        grid.append(text(f'Customer reports label {i}', 'LAPORAN AKTIF', x + 252, y + 122, 160, 16, 10, '$muted', '700'))
        grid.append(text(f'Customer reports value {i}', reports_count, x + 252, y + 145, 180, 20, 13, '$ink', '600'))
        grid.append(icon(f'Customer arrow {i}', 'ArrowUpRight', x + 430, y + 27, 18, '$blue'))
    c.append(frame('Customers grid', 0, 0, 0, 0, grid))
    return frame('08 Customers', 10780, 0, W, H, c, '$bg')


def settings():
    c = page_shell('Team & Access', 'Kelola anggota, role, dan akses workspace.', 'Settings', 'Settings / Team & Access')
    add(c, button('Invite member', 'Undang anggota', 1190, 116, 190, True, 'UserPlus'))
    # settings nav
    nav = [rect('Settings navigation surface', 286, 214, 240, 754, '$surface', 16, '$highlight')]
    settings_items = [('Building2', 'Company Profile'), ('UsersRound', 'Team & Access'), ('PlugZap', 'Integrations'), ('ShieldCheck', 'Security & Logs')]
    y = 252
    for glyph, label in settings_items:
        selected = label == 'Team & Access'
        if selected: nav.append(rect(f'Settings selected {label}', 304, y - 8, 204, 42, '$surface2', 11, '$highlight'))
        nav.append(icon(f'Settings {label} icon', glyph, 320, y + 4, 17, '$blue' if selected else '$muted'))
        nav.append(text(f'Settings {label}', label, 350, y + 3, 145, 20, 12, '$ink' if selected else '$muted', '600' if selected else '500'))
        y += 58
    nav.append(rect('Settings nav divider', 314, 492, 184, 1, '$line', 0))
    nav.append(text('Workspace ID label', 'WORKSPACE ID', 320, 522, 150, 16, 10, '$muted', '700'))
    nav.append(text('Workspace ID value', 'arunika-prod', 320, 546, 170, 20, 12, '$ink', '600'))
    nav.append(text('Workspace plan label', 'PLAN', 320, 598, 150, 16, 10, '$muted', '700'))
    nav.append(badge('Workspace plan', 'Pilot', 320, 622, 86, '$blue', '$brand'))
    c.append(frame('Settings navigation', 0, 0, 0, 0, nav))
    # role table
    main = [rect('Team access surface', 554, 214, 826, 390, '$surface', 16, '$highlight')]
    card_title(main, 'Anggota workspace', 'Peran menentukan data dan tindakan yang dapat diakses.', 580, 238, 440)
    headers = [('NAMA', 580, 250), ('ROLE', 850, 150), ('STATUS', 1040, 130), ('AKSI', 1280, 60)]
    for label, x, w in headers: main.append(text(f'Team header {label}', label, x, 302, w, 16, 10, '$muted', '700'))
    main.append(rect('Team header divider', 580, 330, 770, 1, '$line', 0))
    team = [('Rafi Pratama', 'Owner', 'Aktif', '$success'), ('Dina Kartika', 'Technician', 'Aktif', '$success'), ('Budi Santoso', 'Technician', 'Aktif', '$success'), ('Sari Ningsih', 'Supervisor', 'Nonaktif', '$muted')]
    y = 350
    for i, (name, role, status, col) in enumerate(team):
        main.append(ellipse(f'Team avatar {i}', 580, y, 32, 32, '$brand', '$highlight'))
        main.append(text(f'Team initials {i}', ''.join(x[0] for x in name.split()[:2]), 586, y + 9, 20, 14, 9, '$blue', '700', 'center'))
        main.append(text(f'Team name {i}', name, 626, y + 6, 200, 18, 12, '$ink', '600'))
        main.append(text(f'Team role {i}', role, 850, y + 6, 150, 18, 12, '$muted', '500'))
        main.append(badge(f'Team status {i}', status, 1040, y + 3, 112, col, '$brand'))
        main.append(icon(f'Team menu {i}', 'MoreHorizontal', 1300, y + 7, 17, '$muted'))
        y += 58
    c.append(frame('Team access table', 0, 0, 0, 0, main))
    # integration card
    integ = [rect('Integration card', 554, 628, 826, 340, '$surface', 16, '$highlight')]
    card_title(integ, 'Integrasi aktif', 'Kanal yang dapat menerima dokumentasi teknisi.', 580, 652, 430)
    integ.append(rect('Telegram integration', 580, 706, 770, 88, '$surface2', 14, '$highlight'))
    integ.append(ellipse('Telegram icon surface', 602, 728, 42, 42, '$brand', '$highlight'))
    integ.append(icon('Telegram icon', 'Send', 614, 740, 18, '$blue'))
    integ.append(text('Telegram title', 'Telegram Bot', 662, 718, 240, 20, 13, '$ink', '600'))
    integ.append(text('Telegram detail', '@arunika_lapor_bot · Webhook verified', 662, 744, 320, 18, 11, '$muted', '400'))
    integ.append(badge('Telegram status', 'Aktif', 1178, 736, 92, '$success', '$brand'))
    integ.append(button('Manage integration', 'Kelola integrasi', 580, 838, 180, False, 'Settings2'))
    integ.append(text('Integration note', 'AI hanya memproses pesan yang masuk melalui kanal terintegrasi.', 580, 906, 540, 18, 11, '$muted', '400'))
    c.append(frame('Integrations preview', 0, 0, 0, 0, integ))
    return frame('09 Team and Settings', 12320, 0, W, H, c, '$bg')


screens = [overview(), work_orders(), work_order_detail(), reports(), report_review(), ai_inbox(), technicians(), customers(), settings()]
root = {
    'version': '2.21',
    'children': screens,
    'variables': VARS,
    'fileToken': str(uuid4()),
    'meta': {
        'name': 'BisaLapor Product UI v2',
        'description': 'New product UI covering MVP and P1 operational flows. Legacy design files remain untouched.',
        'designDirection': 'Dark restrained neumorphism using the BisaLapor navy mark.',
        'screens': [s['name'] for s in screens],
    },
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(root, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'WROTE {OUT}')
print(f'SCREENS {len(screens)}')
print(f'BYTES {OUT.stat().st_size}')
